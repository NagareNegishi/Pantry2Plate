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
