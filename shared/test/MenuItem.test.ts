// MenuItem.test.ts
import { describe, expect, it } from '@jest/globals';
import { MenuItemImpl } from '../src/MenuItem';

// Constructor tests
describe('MenuItemImpl', () => {
  it('should set all default values when no data provided', () => {
    const menuItem = new MenuItemImpl({});
    expect(menuItem.name).toBe('Invalid');
    expect(menuItem.description).toBe('No description provided.');
    expect(menuItem.servings).toBe(0);
    expect(menuItem.cookingTime).toBe(0);
    expect(menuItem.difficulty).toBe('any');
    expect(menuItem.ingredients).toEqual([]);
    expect(menuItem.instructions).toEqual([]);
  });
});