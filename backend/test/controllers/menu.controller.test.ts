import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockGenerateMenuSuggestions: any = jest.fn();

jest.unstable_mockModule('../../src/services/claude.service.js', () => ({
  generateMenuSuggestions: mockGenerateMenuSuggestions
}));

describe('menu.controller', () => {
  let generateMenu: any;
  let mockReq: any;
  let mockRes: any;

  beforeEach(async () => {
    // CRITICAL: Dynamic import - loads module AFTER mocks are set up
    const module = await import('../../src/controllers/menu.controller.js');
    generateMenu = module.generateMenu;
    mockGenerateMenuSuggestions.mockClear();
    
    // Mock Express req/res
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // Valid request and response
  it('should validate and return menu response', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({
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
    );

    await generateMenu(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      response: expect.objectContaining({
        menus: expect.arrayContaining([
          expect.objectContaining({
            name: 'Pasta Primavera',
            servings: 2,
            difficulty: 'easy',
            ingredients: expect.arrayContaining(['pasta: 200g', 'vegetables: 100g']),
            instructions: expect.arrayContaining(['Boil pasta', 'Add vegetables'])
          })
        ])
      })
    });
  });

  // Case API could not generate recipes
  it('should return 400 for no recipes from service', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue('INSUFFICIENT_INGREDIENTS');
    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  // Case API response is invalid
  it('should return 500 for invalid service response', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({ invalid: 'data' })
    );
    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });

  // Case API response contains invalid formats
  it('should filter out invalid menus and return only valid ones 1', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({
        menus: [
          {
            name: 'Pasta Primavera',
            description: 'Quick pasta dish',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['pasta: 200g'],
            instructions: ['Boil pasta']
          },
          {
            name: '', // Invalid - empty name
            description: 'Bad menu',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['beef: 200g'],
            instructions: ['Cook beef']
          }
        ]
      })
    );

    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    const response = mockRes.json.mock.calls[0][0];
    expect(response.response.menus).toHaveLength(1); // Only valid menu
    expect(response.response.menus[0].name).toBe('Pasta Primavera');
  });

  it('should filter out invalid menus and return only valid ones 2', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({
        menus: [
          {
            name: 'Pasta Primavera',
            description: 'Quick pasta dish',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: [], // Invalid - missing ingredients
            instructions: ['Boil pasta']
          },
          {
            name: 'Pasta Bolognese',
            description: 'Bad menu',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['beef: 200g'],
            instructions: ['Cook beef']
          }
        ]
      })
    );

    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    const response = mockRes.json.mock.calls[0][0];
    expect(response.response.menus).toHaveLength(1);
    expect(response.response.menus[0].name).toBe('Pasta Bolognese');
  });

  it('should filter out invalid menus and return only valid ones 2', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({
        menus: [
          {
            name: 'Pasta Primavera',
            description: 'Quick pasta dish',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: [], // Invalid - missing ingredients
            instructions: ['Boil pasta']
          },
          {
            name: 'Pasta Bolognese',
            description: 'Bad menu',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['beef: 200g'],
            instructions: ['Cook beef']
          }
        ]
      })
    );

    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    const response = mockRes.json.mock.calls[0][0];
    expect(response.response.menus).toHaveLength(1);
    expect(response.response.menus[0].name).toBe('Pasta Bolognese');
  });

  it('should filter out invalid menus and return only valid ones 3', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({
        menus: [
          {
            name: 'Pasta Primavera',
            description: 'Quick pasta dish',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['pasta: 200g'],
            instructions: [] // Invalid - missing instructions
          },
          {
            name: 'Pasta Bolognese',
            description: 'Bad menu',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['beef: 200g'],
            instructions: ['Cook beef']
          }
        ]
      })
    );

    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    const response = mockRes.json.mock.calls[0][0];
    expect(response.response.menus).toHaveLength(1);
    expect(response.response.menus[0].name).toBe('Pasta Bolognese');
  });

  it('should filter out invalid menus and return only valid ones 4', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({
        menus: [
          {
            name: 'Pasta Primavera',
            description: 'Quick pasta dish',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            ingredients: ['pasta: 200g'],
            instructions: [] // Invalid - missing instructions
          },
          {
            name: 'Pasta Bolognese',
            description: 'Bad menu',
            servings: 2,
            cookingTime: 20,
            difficulty: 'easy',
            // missing ingredients
            instructions: ['Cook beef']
          }
        ]
      })
    );

    await generateMenu(mockReq, mockRes);
    // both will be removed, so return 500 error
    expect(mockRes.status).toHaveBeenCalledWith(500);
    const response = mockRes.json.mock.calls[0][0];
    expect(response.error).toBe('Invalid response from menu generation service');
    expect(response.details.length).toBe(2);
  });

  it('should auto-correct invalid response', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({
        menus: [
          {
            name: 'Pasta Primavera',
            description: 'Quick pasta dish',
            servings: -1, // Invalid servings, will be auto-corrected to 1
            cookingTime: 0, // Invalid cooking time, will be auto-corrected to 10
            difficulty: 'any', // Invalid difficulty, but stays as 'any'
            ingredients: ['pasta: 200g'],
            instructions: ['Boil pasta']
          },
          {
            name: 'Pasta Bolognese',
            description: 'Bad menu',
            servings: 200, // Invalid servings, will be auto-corrected to 12
            cookingTime: 2000, // Invalid cooking time, will be auto-corrected to 720
            difficulty: 'easy',
            ingredients: ['beef: 200g'],
            instructions: ['Cook beef']
          }
        ]
      })
    );

    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    const response = mockRes.json.mock.calls[0][0];
    expect(response.response.menus).toHaveLength(2); // Only valid menu
    expect(response.response.menus[0].name).toBe('Pasta Primavera');
    expect(response.response.menus[1].name).toBe('Pasta Bolognese');
    expect(response.response.menus[0].servings).toBe(1);
    expect(response.response.menus[0].cookingTime).toBe(10);
    expect(response.response.menus[1].servings).toBe(12);
    expect(response.response.menus[1].cookingTime).toBe(720);
  });

});