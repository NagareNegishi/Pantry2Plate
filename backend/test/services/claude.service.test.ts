// claude.service.test.ts
import { describe, expect, it } from '@jest/globals';
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
    [['nuts', 'dairy'], 'Allergies: nuts, dairy'],
    [['gluten', 'other'], 'Allergies: gluten, shellfish'],
    [[], '']  // No allergies case
  ])
  ('should format basic request', (allergies, expected) => {
    const request = new MenuRequestImpl({
      ingredients: ['tomato', 'cheese'], allergies
    });
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain(expected);
    // Ensure other fields are present with defaults

  });
});