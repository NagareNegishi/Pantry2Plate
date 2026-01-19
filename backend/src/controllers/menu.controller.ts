/**
 * backend/src/controllers/menu.controller.ts
 * Controller for menu-related operations.
 */

import type { ValidationResult } from '@pantry2plate/shared';
import { MenuRequestImpl, MenuResponseImpl } from '@pantry2plate/shared';
import { type Request, type Response } from 'express';
import { generateMenuSuggestions } from '../services/claude.service.js';
// For Anthropic specific errors handling: https://github.com/anthropics/anthropic-sdk-typescript
import Anthropic from '@anthropic-ai/sdk';

// Pseudo-code structure
export const generateMenu = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const menuRequest: MenuRequestImpl = new MenuRequestImpl(req.body);
    const validation: ValidationResult = menuRequest.validate();
    if (!validation.valid && validation.errors.includes('At least one ingredient is required')) {
      return res.status(400).json({ error: 'Invalid request', details: validation.errors });
    }

    // Call service
    const response = await generateMenuSuggestions(menuRequest);

    // Case: insufficient ingredients/impossible request
    if (response === "INSUFFICIENT_INGREDIENTS") {
      return res.status(400).json({ error: 'Cannot generate recipes with provided ingredients'});
    }
    // Validate response
    const parsed = JSON.parse(response);
    const menuResponse = new MenuResponseImpl(parsed);
    const responseValidation: ValidationResult = menuResponse.validate();
    if (!responseValidation.valid) {
      return res.status(502).json({
        error: 'Claude API returned invalid menu format',
        details: responseValidation.errors
      });
    }

    // Return response
    res.status(200).json( { response: menuResponse } );

  } catch (error) {
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