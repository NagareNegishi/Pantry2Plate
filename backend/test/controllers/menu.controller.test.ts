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
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ response: expect.any(Object) })
    );
  });

  it('should return 400 for no recipes from service', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue('INSUFFICIENT_INGREDIENTS');
    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it('should return 500 for invalid service response', async () => {
    mockReq.body = { ingredients: ['pasta'] };
    mockGenerateMenuSuggestions.mockResolvedValue(
      JSON.stringify({ invalid: 'data' })
    );
    await generateMenu(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });

});