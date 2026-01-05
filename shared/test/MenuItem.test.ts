// MenuItem.test.ts
import { describe, expect, it } from '@jest/globals';
import { MenuItemImpl } from '../src/MenuItem';

// Constructor tests
describe('Constructor', () => {
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

  it('should set name correctly', () => {
    const menuItem = new MenuItemImpl({
      name: 'Chicken Rice'
    });
    expect(menuItem.name).toBe('Chicken Rice');
  });

  it('should set description correctly', () => {
    const menuItem = new MenuItemImpl({
      description: 'A delicious chicken and rice dish.'
    });
    expect(menuItem.description).toBe('A delicious chicken and rice dish.');
  });

  it('should set servings correctly', () => {
    const menuItem = new MenuItemImpl({
      servings: 4
    });
    expect(menuItem.servings).toBe(4);
  });

  it('should set cookingTime correctly', () => {
    const menuItem = new MenuItemImpl({
      cookingTime: 45
    });
    expect(menuItem.cookingTime).toBe(45);
  });

  it('should set difficulty correctly', () => {
    const menuItem = new MenuItemImpl({
      difficulty: 'medium'
    });
    expect(menuItem.difficulty).toBe('medium');
  });

  it('should set ingredients correctly', () => {
    const menuItem = new MenuItemImpl({
      ingredients: ['2 cups rice', '1 large onion, diced']
    });
    expect(menuItem.ingredients).toEqual(['2 cups rice', '1 large onion, diced']);
  });

  it('should set instructions correctly', () => {
    const menuItem = new MenuItemImpl({
      instructions: ['Rinse the rice.', 'Cook the rice with water.']
    });
    expect(menuItem.instructions).toEqual(['Rinse the rice.', 'Cook the rice with water.']);
  });
});