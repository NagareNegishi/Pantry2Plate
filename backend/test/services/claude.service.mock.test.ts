import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MenuRequestImpl } from '@pantry2plate/shared';

/**
 * For Mocking Anthropic SDK, Jest Mock Functions are used.
 * https://jestjs.io/docs/mock-functions
 *
 * However, since backend is ESM, we use the unstable_mockModule API.
 * https://jestjs.io/docs/ecmascript-modules
 *
 * Note: Dynamic import is used to import the module under test
 * AFTER the mocks are defined. This is critical to ensure the module
 * uses the mocked versions.
 */

const mockCreate: any = jest.fn();

jest.unstable_mockModule('@anthropic-ai/sdk', () => ({ // when code imports @anthropic-ai/sdk, use this fake instead
  default: jest.fn(() => ({ // default is Anthropic class
    messages: { create: mockCreate } // only replace messages.create method
  }))
}));

// Mock CLAUDE_CONFIG to enable API calls during tests
jest.unstable_mockModule('../../src/config/claude.config.js', () => ({
  CLAUDE_CONFIG: {
    apiKey: 'test-key',
    enabled: true,
    model: 'claude-sonnet-4-20250514',
    maxTokens: 1,
    temperature: 0.7,
    system: 'test'
  }
}));

describe('generateMenuSuggestions - mocked', () => {
  let generateMenuSuggestions: (request: MenuRequestImpl) => Promise<string>;

  beforeEach(async () => {
    // CRITICAL: Dynamic import - loads module AFTER mocks are set up
    const module = await import('../../src/services/claude.service.js');
    generateMenuSuggestions = module.generateMenuSuggestions; // Extracts the function from the imported module
    mockCreate.mockClear(); // Clear mock call history before each test
  });

  // Valid response
  it('should parse valid menu response', async () => {
    mockCreate.mockResolvedValue({
      content: [{
        type: 'text',
        text: JSON.stringify({
          menus: [{
            name: 'Pasta Primavera',
            description: 'Quick pasta dish',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['pasta: 200g', 'vegetables: 100g'],
            instructions: ['Boil pasta', 'Add vegetables']
          }]
        })
      }]
    });

    const request = new MenuRequestImpl({ ingredients: ['pasta'] });
    const result = await generateMenuSuggestions(request);

    const parsed = JSON.parse(result);
    expect(parsed.menus[0].name).toBe('Pasta Primavera');
    expect(parsed.menus[0].description).toBe('Quick pasta dish');
    expect(parsed.menus[0].servings).toBe(2);
    expect(parsed.menus[0].cookingTime).toBe(20);
    expect(parsed.menus[0].difficulty).toBe('easy');
    expect(parsed.menus[0].ingredients).toEqual(['pasta: 200g', 'vegetables: 100g']);
    expect(parsed.menus[0].instructions).toEqual(['Boil pasta', 'Add vegetables']);
  });

  it('should handle INSUFFICIENT_INGREDIENTS response', async () => {
    mockCreate.mockResolvedValue({
      content: [{
        type: 'text',
        text: 'INSUFFICIENT_INGREDIENTS'  // Should be plain text, not JSON
      }]
    });
    const request = new MenuRequestImpl({ ingredients: ['pasta'] });
    const result = await generateMenuSuggestions(request);
    expect(result).toBe('INSUFFICIENT_INGREDIENTS');
  });


  // Invalid response format
  it('should throw error when content is empty', async () => {
    mockCreate.mockResolvedValue({
      content: []  // Empty array
    });
    const request = new MenuRequestImpl({ ingredients: ['pasta'] });
    await expect(generateMenuSuggestions(request))
      .rejects.toThrow('Unexpected response format from Claude API');
  });

  it('should throw error when content type is not text', async () => {
    mockCreate.mockResolvedValue({
      content: [{ type: 'image', /* ... */ }]  // Wrong type
    });
    const request = new MenuRequestImpl({ ingredients: ['pasta'] });
    await expect(generateMenuSuggestions(request))
      .rejects.toThrow('Unexpected response format from Claude API');
  });

  // Valid response with multiple menus
  it('should parse valid menu with multiple responses', async () => {
    mockCreate.mockResolvedValue({
      content: [{
        type: 'text',
        text: JSON.stringify({
          menus: [
            {
              name: 'Pasta Primavera',
              description: 'Quick pasta dish',
              servings: 2,
              cookingTime: 20,
              difficulty: 'easy',
              ingredients: ['pasta: 200g', 'vegetables: 100g'],
              instructions: ['Boil pasta', 'Add vegetables']
            },
            {
              name: 'Pasta Bolognese',
              description: 'Hearty meat sauce',
              servings: 4,
              cookingTime: 45,
              difficulty: 'medium',
              ingredients: ['pasta: 400g', 'ground beef: 300g', 'tomato sauce: 200ml'],
              instructions: ['Cook pasta', 'Prepare meat sauce', 'Combine and serve']
            }
          ]
        })
      }]
    });

    const request = new MenuRequestImpl({ ingredients: ['pasta'] });
    const result = await generateMenuSuggestions(request);

    const parsed = JSON.parse(result);
    expect(parsed.menus[0].name).toBe('Pasta Primavera');
    expect(parsed.menus[0].description).toBe('Quick pasta dish');
    expect(parsed.menus[0].servings).toBe(2);
    expect(parsed.menus[0].cookingTime).toBe(20);
    expect(parsed.menus[0].difficulty).toBe('easy');
    expect(parsed.menus[0].ingredients).toEqual(['pasta: 200g', 'vegetables: 100g']);
    expect(parsed.menus[0].instructions).toEqual(['Boil pasta', 'Add vegetables']);
    expect(parsed.menus[1].name).toBe('Pasta Bolognese');
    expect(parsed.menus[1].description).toBe('Hearty meat sauce');
    expect(parsed.menus[1].servings).toBe(4);
    expect(parsed.menus[1].cookingTime).toBe(45);
    expect(parsed.menus[1].difficulty).toBe('medium');
    expect(parsed.menus[1].ingredients).toEqual(['pasta: 400g', 'ground beef: 300g', 'tomato sauce: 200ml']);
    expect(parsed.menus[1].instructions).toEqual(['Cook pasta', 'Prepare meat sauce', 'Combine and serve']);
  });

  // Response with markdown-wrapped JSON
it('should clean markdown-wrapped JSON response', async () => {
  mockCreate.mockResolvedValue({
    content: [{
      type: 'text',
      text: '```json\n{"menus": [{"name": "Test", "description": "Test dish", "servings": 2, "cookingTime": 20, "difficulty": "easy", "ingredients": ["pasta: 200g"], "instructions": ["Cook"]}]}\n```'
    }]
  });
  const request = new MenuRequestImpl({ ingredients: ['pasta'] });
  const result = await generateMenuSuggestions(request);
  const parsed = JSON.parse(result); // Should parse cleanly
  expect(parsed.menus).toBeDefined();
  expect(parsed.menus[0].name).toBe('Test');
});


});