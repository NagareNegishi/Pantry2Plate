/**
 * backend/src/controllers/menu.controller.ts
 * Controller for menu-related operations.
 */

import type { ValidationResult } from '@pantry2plate/shared';
import { MenuRequestImpl, MenuResponseImpl } from '@pantry2plate/shared';
import { type Request, type Response } from 'express';
import { generateMenuSuggestions } from '../services/claude.service.js';
import { cacheProductionPair, logProductionResult } from '../utils/production-logger.js';
// For Anthropic specific errors handling: https://github.com/anthropics/anthropic-sdk-typescript
import Anthropic from '@anthropic-ai/sdk';

// Pseudo-code structure
export const generateMenu = async (req: Request, res: Response) => {
  let menuRequest: MenuRequestImpl | undefined;
  try {
    // Validate request body
    menuRequest = new MenuRequestImpl(req.body);
    const validation: ValidationResult = menuRequest.validate();
    if (!validation.valid && validation.errors.includes('At least one ingredient is required')) {
      logProductionResult('validation_error', menuRequest, undefined, validation.errors.join(', '));
      return res.status(400).json({ error: 'Invalid request', details: validation.errors });
    }

    // Call service
    const response = await generateMenuSuggestions(menuRequest);

    // Case: insufficient ingredients/impossible request
    if (response === "INSUFFICIENT_INGREDIENTS") {
      logProductionResult('insufficient', menuRequest, response);
      return res.status(400).json({ error: 'Cannot generate recipes with provided ingredients'});
    }
    // Validate response
    const parsed = JSON.parse(response);
    const menuResponse = new MenuResponseImpl(parsed);
    const responseValidation: ValidationResult = menuResponse.validate();
    if (!responseValidation.valid) {
      logProductionResult('api_error', menuRequest, response, responseValidation.errors.join(', '));
      return res.status(502).json({
        error: 'Claude API returned invalid menu format',
        details: responseValidation.errors
      });
    }

    // Success: log AND cache, then return
    logProductionResult('success', menuRequest, response);
    cacheProductionPair(menuRequest, response);
    res.status(200).json( { response: menuResponse } );

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    if (menuRequest) {
      logProductionResult('api_error', menuRequest, undefined, errorMsg);
    } else {
      console.error('Error before menuRequest creation:', errorMsg);
    }
    // Handle specific Anthropic errors
    if (error instanceof SyntaxError) {
      console.error('JSON Parse Error:', error);
      return res.status(502).json({ error: 'Invalid response format from Claude API' });
    } else if (error instanceof Anthropic.RateLimitError) {  // Check BEFORE APIError
      console.error('Claude API Rate Limit:', error.message);
      return res.status(429).json({ error: 'Rate limit exceeded, please try again later' });
    } else if (error instanceof Anthropic.AuthenticationError) {  // Check BEFORE APIError
      console.error('Claude API Authentication Error:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    } else if (error instanceof Anthropic.APIConnectionError) {
      console.error('Claude API Connection Error:', error.message);
      return res.status(502).json({ error: 'Unable to connect to Claude API' });
    } else if (error instanceof Anthropic.APIError) {  // General case LAST
      console.error('Claude API Error:', error.message);
      return res.status(502).json({ error: 'Error from Claude API' });
    } else {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Internal server error' });  // Add return here too
    }
  }
};