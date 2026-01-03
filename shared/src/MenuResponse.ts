// shared/src/MenuResponse.ts

import { MenuItem, MenuItemImpl, ValidationResult } from './MenuItem';

/**
 * Menu response from Claude API
 * Contains 0-3 menu suggestions based on user's request
 */
export interface MenuResponse {
  /** List of menu suggestions (0-3 items) */
  menus: MenuItem[];
}


/**
 * MenuResponse implementation with validation
 */
export class MenuRequestImpl implements MenuResponse {
  menus: MenuItemImpl[];

  constructor(menus: Partial<MenuResponse> ) {
    // Parse each menu item from the response
    const rawMenus = menus.menus ?? [];
    this.menus = rawMenus.map(menu => new MenuItemImpl(menu));
  }

  validate(): ValidationResult {
    const errors: string[] = [];
    const validations: ValidationResult[] = this.menus.map(menu => menu.validate());
    
    // Remove completely invalid menus (name/ingredients/instructions missing)
    this.menus = this.menus.filter((menu, index) => {
      
      // Remove from list
      if (menu.name === 'Invalid') {
        errors.push(`Removed menu ${index + 1}: missing critical fields`);
        return false;
      }
      
      // Keep menu but flag if it has minor errors
      const validation: ValidationResult = validations[index];
      if (!validation.valid) {
        errors.push(`Menu ${index + 1} has warnings: ${validation.errors.join(', ')}`);
      }
      return true;
    });

  }


}