// claude.service.test.ts
import { describe, expect, it } from '@jest/globals';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { formatMenuPrompt } from '../../src/services/claude.service.js';


describe('formatMenuPrompt', () => {
  it('should format basic request', () => {
    const request = new MenuRequestImpl({
      ingredients: ['chicken', 'rice']
    });
    
    const prompt = formatMenuPrompt(request);
    expect(prompt).toContain('Ingredients: chicken, rice');
  });
});