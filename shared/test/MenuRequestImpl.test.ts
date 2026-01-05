// tests/MenuRequestImpl.test.ts

// Import what to test
import { MenuRequestImpl } from '../src/MenuRequest';

// suppress ts errors
import { describe, expect, it } from '@jest/globals';

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

  it('must provide valid custom mealType when mealType is other', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      mealType: 'other'
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Custom meal type required but invalid format provided');
    expect(request.mealType).toBe('any'); // Auto-corrected to default
    expect(request.mealTypeCustom).toEqual('');

    const request2 = new MenuRequestImpl({
      ingredients: ['tomato'],
      mealType: 'other',
      mealTypeCustom: 'Midnight Snack'
    });
    const validation2 = request2.validate();
    expect(validation2.valid).toBe(true);
    expect(request2.mealType).toBe('other');
    expect(request2.mealTypeCustom).toBe('Midnight Snack');

    const request3 = new MenuRequestImpl({
      ingredients: ['tomato'],
      mealType: 'other',
      mealTypeCustom: '@Invalid Input'
    });
    const validation3 = request3.validate();
    expect(validation3.valid).toBe(false);
    expect(validation3.errors).toContain('Custom meal type required but invalid format provided');
    expect(request3.mealType).toBe('any'); // Auto-corrected to default
    expect(request3.mealTypeCustom).toEqual('');
  });

  it('must provide valid custom cuisineType when cuisineType is other', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      cuisineType: 'other'
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Custom cuisine type required but invalid format provided');
    expect(request.cuisineType).toBe('any'); // Auto-corrected to default
    expect(request.cuisineTypeCustom).toEqual('');

    const request2 = new MenuRequestImpl({
      ingredients: ['tomato'],
      cuisineType: 'other',
      cuisineTypeCustom: 'Fusion'
    });
    const validation2 = request2.validate();
    expect(validation2.valid).toBe(true);
    expect(request2.cuisineType).toBe('other');
    expect(request2.cuisineTypeCustom).toBe('Fusion');

    const request3 = new MenuRequestImpl({
      ingredients: ['tomato'],
      cuisineType: 'other',
      cuisineTypeCustom: '123Invalid'
    });
    const validation3 = request3.validate();
    expect(validation3.valid).toBe(false);
    expect(validation3.errors).toContain('Custom cuisine type required but invalid format provided');
    expect(request3.cuisineType).toBe('any'); // Auto-corrected to default
    expect(request3.cuisineTypeCustom).toEqual('');
  });

  it('must provide valid custom cookingMethod when cookingMethod is other', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      cookingMethod: 'other'
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Custom cooking method required but invalid format provided');
    expect(request.cookingMethod).toBe('any'); // Auto-corrected to default
    expect(request.cookingMethodCustom).toEqual('');

    const request2 = new MenuRequestImpl({
      ingredients: ['tomato'],
      cookingMethod: 'other',
      cookingMethodCustom: 'Sous Vide'
    });
    const validation2 = request2.validate();
    expect(validation2.valid).toBe(true);
    expect(request2.cookingMethod).toBe('other');
    expect(request2.cookingMethodCustom).toBe('Sous Vide');

    const request3 = new MenuRequestImpl({
      ingredients: ['tomato'],
      cookingMethod: 'other',
      cookingMethodCustom: '!InvalidMethod'
    });
    const validation3 = request3.validate();
    expect(validation3.valid).toBe(false);
    expect(validation3.errors).toContain('Custom cooking method required but invalid format provided');
    expect(request3.cookingMethod).toBe('any'); // Auto-corrected to default
    expect(request3.cookingMethodCustom).toEqual('');
  });

  it('must provide valid custom allergy when allergies includes other', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      allergies: ['peanuts', 'other']
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Custom allergy required but invalid format provided');
    expect(request.allergies).toEqual(['peanuts']); // 'other' removed
    expect(request.allergiesCustom).toEqual([]);

    const request2 = new MenuRequestImpl({
      ingredients: ['tomato'],
      allergies: ['wheat', 'other'],
      allergiesCustom: ['Pollen']
    });
    const validation2 = request2.validate();
    expect(validation2.valid).toBe(true);
    expect(request2.allergies).toEqual(['wheat', 'other']);
    expect(request2.allergiesCustom).toEqual(['Pollen']);

    const request3 = new MenuRequestImpl({
      ingredients: ['tomato'],
      allergies: ['soy', 'other'],
      allergiesCustom: ['!InvalidAllergy']
    });
    const validation3 = request3.validate();
    expect(validation3.valid).toBe(false);
    expect(validation3.errors).toContain('Custom allergy required but invalid format provided');
    expect(request3.allergies).toEqual(['soy']); // 'other' removed
    expect(request3.allergiesCustom).toEqual([]);

    const request4 = new MenuRequestImpl({
      ingredients: ['tomato'],
      allergies: ['other'],
      allergiesCustom: ['Pollen', '@BadEntry']
    });
    const validation4 = request4.validate();
    expect(validation4.valid).toBe(true);
    expect(request4.allergies).toEqual(['other']);
    expect(request4.allergiesCustom).toEqual(['Pollen']); // Only valid entries kept
  });

  it('must provide valid custom dietaryRestriction when dietaryRestrictions includes other', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      dietaryRestrictions: ['vegetarian', 'other']
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Custom dietary restriction required but invalid format provided');
    expect(request.dietaryRestrictions).toEqual(['vegetarian']); // 'other' removed
    expect(request.dietaryRestrictionsCustom).toEqual([]);

    const request2 = new MenuRequestImpl({
      ingredients: ['tomato'],
      dietaryRestrictions: ['vegan', 'other'],
      dietaryRestrictionsCustom: ['Low Sugar']
    });
    const validation2 = request2.validate();
    expect(validation2.valid).toBe(true);
    expect(request2.dietaryRestrictions).toEqual(['vegan', 'other']);
    expect(request2.dietaryRestrictionsCustom).toEqual(['Low Sugar']);

    const request3 = new MenuRequestImpl({
      ingredients: ['tomato'],
      dietaryRestrictions: ['keto', 'other'],
      dietaryRestrictionsCustom: ['#InvalidRestriction']
    });
    const validation3 = request3.validate();
    expect(validation3.valid).toBe(false);
    expect(validation3.errors).toContain('Custom dietary restriction required but invalid format provided');
    expect(request3.dietaryRestrictions).toEqual(['keto']); // 'other' removed
    expect(request3.dietaryRestrictionsCustom).toEqual([]);

    const request4 = new MenuRequestImpl({
      ingredients: ['tomato'],
      dietaryRestrictions: ['other'],
      dietaryRestrictionsCustom: ['Low Sugar', '%BadEntry']
    });
    const validation4 = request4.validate();
    expect(validation4.valid).toBe(true);
    expect(request4.dietaryRestrictions).toEqual(['other']);
    expect(request4.dietaryRestrictionsCustom).toEqual(['Low Sugar']); // Only valid entries kept
  });

  it('must provide valid custom flavorProfile when flavorProfiles includes other', () => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato'],
      flavorProfiles: ['spicy', 'other']
    });
    const validation = request.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Custom flavor profile required but invalid format provided');
    expect(request.flavorProfiles).toEqual(['spicy']); // 'other' removed
    expect(request.flavorProfilesCustom).toEqual([]);

    const request2 = new MenuRequestImpl({
      ingredients: ['tomato'],
      flavorProfiles: ['savory', 'other'],
      flavorProfilesCustom: ['Umami']
    });
    const validation2 = request2.validate();
    expect(validation2.valid).toBe(true);
    expect(request2.flavorProfiles).toEqual(['savory', 'other']);
    expect(request2.flavorProfilesCustom).toEqual(['Umami']);

    const request3 = new MenuRequestImpl({
      ingredients: ['tomato'],
      flavorProfiles: ['sweet', 'other'],
      flavorProfilesCustom: ['*InvalidFlavor']
    });
    const validation3 = request3.validate();
    expect(validation3.valid).toBe(false);
    expect(validation3.errors).toContain('Custom flavor profile required but invalid format provided');
    expect(request3.flavorProfiles).toEqual(['sweet']); // 'other' removed
    expect(request3.flavorProfilesCustom).toEqual([]);

    const request4 = new MenuRequestImpl({
      ingredients: ['tomato'],
      flavorProfiles: ['other'],
      flavorProfilesCustom: ['Zesty', '^BadEntry']
    });
    const validation4 = request4.validate();
    expect(validation4.valid).toBe(true);
    expect(request4.flavorProfiles).toEqual(['other']);
    expect(request4.flavorProfilesCustom).toEqual(['Zesty']); // Only valid entries kept
  });

});