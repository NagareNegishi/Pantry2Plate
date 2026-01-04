// tests/MenuRequestImpl.test.ts

// Import what to test
import { MenuRequestImpl } from '../src/MenuRequest';

// Jest test syntax:
// test(name, fn, timeout)
// Also under the alias: it(name, fn, timeout)
// So test == it

// Constructor tests
describe('Constructor', () => {
  it('should set all default values when no data provided', () => {
    const request = new MenuRequestImpl({});
    expect(request.ingredients).toEqual([]);
    expect(request.allergies).toEqual([]);
    expect(request.dietaryRestrictions).toEqual([]);
    expect(request.servings).toBe(1);
    expect(request.mealType).toBe('any');
    expect(request.flavorProfiles).toEqual(['any']);
    expect(request.cuisineType).toBe('any');
    expect(request.cookingMethod).toBe('any');
    expect(request.maxCookingTime).toBe(60);
    expect(request.difficulty).toBe('any');
  });

  it('should set ingredient correctly', () => {
    const request = new MenuRequestImpl({
      ingredients: ['chicken', 'rice']
    });
    expect(request.ingredients).toEqual(['chicken', 'rice']);
  });

  it('should set allergies correctly', () => {
    const request = new MenuRequestImpl({
      allergies: ['peanuts', 'wheat']
    });
    expect(request.allergies).toEqual(['peanuts', 'wheat']);
  });

  it('should set dietary restrictions correctly', () => {
    const request = new MenuRequestImpl({
      dietaryRestrictions: ['vegetarian', 'gluten-free']
    });
    expect(request.dietaryRestrictions).toEqual(['vegetarian', 'gluten-free']);
  });

  it('should set servings correctly', () => {
    const request = new MenuRequestImpl({
      servings: 4
    });
    expect(request.servings).toBe(4);
  });

  it('should set mealType correctly', () => {
    const request = new MenuRequestImpl({
      mealType: 'dinner'
    });
    expect(request.mealType).toBe('dinner');
  });

  it('should set flavorProfiles correctly', () => {
    const request = new MenuRequestImpl({
      flavorProfiles: ['spicy', 'savory']
    });
    expect(request.flavorProfiles).toEqual(['spicy', 'savory']);
  });

  it('should set cuisineType correctly', () => {
    const request = new MenuRequestImpl({
      cuisineType: 'Italian'
    });
    expect(request.cuisineType).toBe('Italian');
  });

  it('should set cookingMethod correctly', () => {
    const request = new MenuRequestImpl({
      cookingMethod: 'bake'
    });
    expect(request.cookingMethod).toBe('bake');
  });

  it('should set maxCookingTime correctly', () => {
    const request = new MenuRequestImpl({
      maxCookingTime: 30
    });
    expect(request.maxCookingTime).toBe(30);
  });

  it('should set difficulty correctly', () => {
    const request = new MenuRequestImpl({
      difficulty: 'easy'
    });
    expect(request.difficulty).toBe('easy');
  });
});


// Constructor tests with validation
describe('Constructor Validation', () => {
  it('must have ingredient', () => {
    const request = new MenuRequestImpl({});
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('At least one ingredient is required');
  });

  it('must have servings >= 1', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      servings: 0
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Servings must be at least 1');
    expect(request.servings).toBe(1); // Auto-corrected
  });

  it('Maximum 3 flavor profiles allowed', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      flavorProfiles: ['spicy', 'savory', 'sweet', 'sour']
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Maximum 3 flavor profiles allowed');
    expect(request.flavorProfiles.length).toBe(3); // Trimmed to 3
    expect(request.flavorProfiles).toEqual(['spicy', 'savory', 'sweet']);
  });

  it("'any' cannot be combined with other flavors", () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      flavorProfiles: ['any', 'spicy']
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain("'any' cannot be combined with other flavors");
    expect(request.flavorProfiles).toEqual(['any']); // Auto-corrected
  });

  it('maxCookingTime must be between 10 and 720 minutes', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      maxCookingTime: 5
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Cooking time must be between 10 and 720 minutes');
    expect(request.maxCookingTime).toBe(10); // Auto-corrected to lower bound

    const request2 = new MenuRequestImpl({
      ingredients: ['tomato'],
      maxCookingTime: 800
    });
    const validation2 = request2.validate();
    expect(validation2.valid).toBe(false);
    expect(validation2.errors).toContain('Cooking time must be between 10 and 720 minutes');
    expect(request2.maxCookingTime).toBe(720); // Auto-corrected to upper bound
  });

});