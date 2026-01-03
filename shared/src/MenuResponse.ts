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
 * Validation result for entire menu response
 */
export interface ValidationResults {
  valid: boolean;
  errors: string[];
  validations: ValidationResult[];
}


/**
 * MenuResponse implementation with validation
 */
export class MenuRequestImpl implements MenuResponse {
  menus: MenuItem[];

  constructor(menus: Partial<MenuResponse> ) {
    // Parse each menu item from the response
    const rawMenus = menus.menus ?? [];
    this.menus = rawMenus.map(menu => new MenuItemImpl(menu));
  }

}