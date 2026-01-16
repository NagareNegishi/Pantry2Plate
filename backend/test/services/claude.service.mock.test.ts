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
  });
});