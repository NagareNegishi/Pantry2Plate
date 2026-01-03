// shared/src/MenuResponse.ts

import { MenuItem } from './MenuItem';

/**
 * Menu response from Claude API
 * Contains 0-3 menu suggestions based on user's request
 */
export interface MenuResponse {
  /** List of menu suggestions (0-3 items) */
  menus: MenuItem[];
}