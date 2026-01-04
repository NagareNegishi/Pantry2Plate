// tests/MenuRequestImpl.test.ts

// Import what to test
import { MenuRequestImpl } from '../src/MenuRequest';

// Jest test syntax:
// test(name, fn, timeout)
// Also under the alias: it(name, fn, timeout)
// So test == it


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

});
