// claude.service.test.ts
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type {
  Allergy,
  CookingMethod,
  CuisineType,
  DietaryRestriction,
  Difficulty,
  FlavorProfile,
  MealType
} from '@pantry2plate/shared';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { formatMenuPrompt, generateMenuSuggestions } from '../../src/services/claude.service.js';

import Anthropic from '@anthropic-ai/sdk';
// mock Anthropic: https://jestjs.io/docs/mock-functions
jest.mock('@anthropic-ai/sdk');


describe('generateMenuSuggestions - mocked', () => {
  let mockCreate: any;  // Just use 'any' for the mock itself

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreate = jest.fn();

    (Anthropic as any).mockImplementation(() => ({
      messages: {
        create: mockCreate
      }
    }));
  });

  it('should parse valid SUCCESS response', async () => {
    mockCreate.mockResolvedValue({
      content: [{
        type: 'text',
        text: JSON.stringify({
          status: 'SUCCESS',
          items: [{ name: 'Pasta', ingredients: ['pasta'], servings: 2 }]
        })
      }]
    });

    const request = new MenuRequestImpl({ ingredients: ['pasta'] });
    const result = await generateMenuSuggestions(request);
    const parsed = typeof result === 'string' ? JSON.parse(result) : result;

    expect(parsed.status).toBe('SUCCESS');
  });
});





// validation() must be called before formatMenuPrompt, so I will not test invalid cases here
describe('formatMenuPrompt', () => {
  it.each([
    [['chicken', 'rice'], 'Ingredients: chicken, rice'],
    [['tofu'], 'Ingredients: tofu'],
    [['beef', 'potatoes', 'carrots'], 'Ingredients: beef, potatoes, carrots']
  ])
  ('should format basic request', (ingredients, expected) => {
    const request = new MenuRequestImpl({ ingredients });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
    // Ensure other fields are present with defaults
    expect(prompt).toContain('Servings: 1');
    expect(prompt).toContain('Max Cooking Time: 60 minutes');
    expect(prompt).toContain('Meal Type: any');
    expect(prompt).toContain('Cuisine Type: any');
    expect(prompt).toContain('Flavor Profiles: any');
    expect(prompt).toContain('Cooking Method: any');
    expect(prompt).toContain('Difficulty: any');
  });

  it.each([
    [['tree-nuts', 'milk'], [], 'Allergies: tree-nuts, milk'],
    [['wheat', 'other'], ['shellfish'], 'Allergies: wheat, shellfish'],
    [['other'], ['soy', 'eggs'], 'Allergies: soy, eggs'],
    [[], [], '']  // No allergies
  ])
  ('should format allergies correctly', (allergies, allergiesCustom, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato', 'cheese'],
      allergies: allergies as Allergy[],
      allergiesCustom
    });
    const prompt = formatMenuPrompt(request);
    if (expected) {
      expect(prompt).toContain(expected);
    } else {
      expect(prompt).not.toContain('Allergies:');
    }
  });

  it.each([
    [['vegetarian', 'gluten-free'], [], 'Dietary Restrictions: vegetarian, gluten-free'],
    [['vegan', 'other'], ['low-sodium'], 'Dietary Restrictions: vegan, low-sodium'],
    [['vegan', 'other'], ['low_sodium'], 'Dietary Restrictions: vegan' ], // invalid custom ignored
    [['other'], ['keto', 'paleo'], 'Dietary Restrictions: keto, paleo'],
    [[], [], '']  // No restrictions
  ])
  ('should format dietary restrictions correctly', (restrictions, restrictionsCustom, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato', 'cheese'],
      dietaryRestrictions: restrictions as DietaryRestriction[],
      dietaryRestrictionsCustom: restrictionsCustom
    });
    const prompt = formatMenuPrompt(request);
    if (expected) {
      expect(prompt).toContain(expected);
    } else {
      expect(prompt).not.toContain('Dietary Restrictions:');
    }
  });

  it.each([
    [1, 'Servings: 1'],
    [5, 'Servings: 5'],
    [12, 'Servings: 12'],
  ])
  ('should format servings correctly', (servings, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['salmon'],
      servings
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
  });

  it.each([
    [15, 'Max Cooking Time: 15 minutes'],
    [90, 'Max Cooking Time: 90 minutes'],
    [720, 'Max Cooking Time: 720 minutes'],
  ])
  ('should format max cooking time correctly', (maxCookingTime, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['pasta'],
      maxCookingTime
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
  });

  it.each([
    ['breakfast', '', 'Meal Type: breakfast'],
    ['breakfast', 'brunch', 'Meal Type: breakfast'],
    ['other', 'brunch', 'Meal Type: brunch'],
    ['any', '', 'Meal Type: any'],
  ])
  ('should format meal type correctly', (mealType, mealTypeCustom, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['eggs'],
      mealType: mealType as MealType,
      mealTypeCustom
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
  });

  it.each([
    ['italian', '', 'Cuisine Type: italian'],
    ['mexican', 'fusion', 'Cuisine Type: mexican'],
    ['other', 'fusion', 'Cuisine Type: fusion'],
    ['any', '', 'Cuisine Type: any'],
  ])
  ('should format cuisine type correctly', (cuisineType, cuisineTypeCustom, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['beans'],
      cuisineType: cuisineType as CuisineType,
      cuisineTypeCustom
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
  });

  it.each([
    [['spicy', 'savory'], [], 'Flavor Profiles: spicy, savory'],
    [['sweet', 'other'], ['umami'], 'Flavor Profiles: sweet, umami'],
    [['other'], ['tangy', 'zesty'], 'Flavor Profiles: tangy, zesty'],
    [['any'], [], 'Flavor Profiles: any'],
  ])
  ('should format flavor profiles correctly', (flavorProfiles, flavorProfilesCustom, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['chicken'],
      flavorProfiles: flavorProfiles as FlavorProfile[],
      flavorProfilesCustom
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
  });

  it.each([
    ['grill', '', 'Cooking Method: grill'],
    ['bake', 'roasting', 'Cooking Method: bake'],
    ['other', 'roasting', 'Cooking Method: roasting'],
    ['any', '', 'Cooking Method: any'],
  ])
  ('should format cooking method correctly', (cookingMethod, cookingMethodCustom, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['fish'],
      cookingMethod: cookingMethod as CookingMethod,
      cookingMethodCustom
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
  });

  it.each([
    ['easy', 'Difficulty: easy'],
    ['medium', 'Difficulty: medium'],
    ['hard', 'Difficulty: hard'],
    ['any', 'Difficulty: any'],
  ])
  ('should format difficulty correctly', (difficulty, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['pork'],
      difficulty: difficulty as Difficulty
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
  });

});