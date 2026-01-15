// claude.service.test.ts
import { describe, expect, it } from '@jest/globals';
import type { Allergy, DietaryRestriction } from '@pantry2plate/shared';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { formatMenuPrompt } from '../../src/services/claude.service.js';


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
});