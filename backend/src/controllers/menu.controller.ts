/**
 * backend/src/controllers/menu.controller.ts
 * Controller for menu-related operations.
 */

import type { ValidationResult } from '@pantry2plate/shared';
import { MenuRequestImpl, MenuResponseImpl } from '@pantry2plate/shared';
import { type Request, type Response } from 'express';
import { generateMenuSuggestions } from '../services/claude.service.js';

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
    // const menuResponse = await generateMenuSuggestions(menuRequest);
    const response = await generateMenuSuggestions("Say something short in one sentence");

    const parsed = JSON.parse(response);
    const menuResponse = new MenuResponseImpl(parsed);
    const responseValidation: ValidationResult = menuResponse.validate();
    if (!responseValidation.valid) {
      return res.status(500).json({
        error: 'Invalid response from menu generation service',
        details: responseValidation.errors
      });
    }

    // Return response
    res.status(200).json( { response: menuResponse } );

  } catch (error) {
    // Simple error handling
    console.error('Error in generateMenu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};