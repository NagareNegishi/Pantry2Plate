// claude.service.test.ts
import { describe, expect, it } from '@jest/globals';
import type { Allergy } from '@pantry2plate/shared';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { formatMenuPrompt } from '../../src/services/claude.service.js';


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
});