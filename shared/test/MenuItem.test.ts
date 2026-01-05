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


// Constructor tests with validation
describe('Constructor Validation', () => {
  it('must have name', () => {
    const menuItem = new MenuItemImpl({});
    const validation = menuItem.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Recipe name is missing.');
    expect(menuItem.name).toBe('Invalid');
  });

  it('must have description', () => {
    const menuItem = new MenuItemImpl({});
    const validation = menuItem.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Recipe description is missing.');
    expect(menuItem.description).toBe('No description provided.');
  });

  it('servings must be greater than zero', () => {
    const menuItem = new MenuItemImpl({ servings: 0 });
    const validation = menuItem.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Servings must be greater than zero.');
    expect(menuItem.servings).toBe(1); // Auto-corrected to 1
  });

  it('cookingTime must be between 10 and 720 minutes', () => {
    const menuItemLow = new MenuItemImpl({ cookingTime: 5 });
    const validationLow = menuItemLow.validate();
    expect(validationLow.valid).toBe(false);
    expect(validationLow.errors).toContain('Cooking time must be between 10 and 720 minutes');
    expect(menuItemLow.cookingTime).toBe(10); // Auto-corrected to min

    const menuItemHigh = new MenuItemImpl({ cookingTime: 800 });
    const validationHigh = menuItemHigh.validate();
    expect(validationHigh.valid).toBe(false);
    expect(validationHigh.errors).toContain('Cooking time must be between 10 and 720 minutes');
    expect(menuItemHigh.cookingTime).toBe(720); // Auto-corrected to max
  });

  it('difficulty should not be "any"', () => {
    const menuItem = new MenuItemImpl({ difficulty: 'any' });
    const validation = menuItem.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Recipe difficulty is not specified.');
    expect(menuItem.difficulty).toBe('any');
  });

  it('must have at least one ingredient', () => {
    const menuItem = new MenuItemImpl({});
    const validation = menuItem.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Ingredients list is empty.');
    expect(menuItem.ingredients).toEqual([]);
    expect(menuItem.name).toBe('Invalid');
  });

  it('must have at least one instruction', () => {
    const menuItem = new MenuItemImpl({});
    const validation = menuItem.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Instructions list is empty.');
    expect(menuItem.instructions).toEqual([]);
    expect(menuItem.name).toBe('Invalid');
  });
});