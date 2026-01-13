/**
 * backend/src/controllers/menu.controller.ts
 * Controller for menu-related operations.
 */

import type { ValidationResult } from '@pantry2plate/shared';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { type Request, type Response } from 'express';
import { generateMenuSuggestions } from '../services/claude.service.js';

// Pseudo-code structure
export const generateMenu = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const menuRequest: MenuRequestImpl = new MenuRequestImpl(req.body);
    const validation: ValidationResult = menuRequest.validate();
    if (validation.valid === false && validation.errors.includes('At least one ingredient is required')) {
      return res.status(400).json({ error: 'Invalid request', details: validation.errors });
    }


    // Call service
    // const menuResponse = await generateMenuSuggestions(menuRequest);
    const menuResponse = await generateMenuSuggestions("Say something short in one sentence");

    // 2. Extract text from content blocks
    const text = menuResponse[0].text;  // Anthropic SDK returns content array






    // Return response
    res.status(200).json( { response: menuResponse } );

  } catch (error) {
    // Simple error handling
    console.error('Error in generateMenu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};