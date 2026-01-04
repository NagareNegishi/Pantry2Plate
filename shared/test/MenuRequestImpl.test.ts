// tests/MenuRequestImpl.test.ts

// Import what to test
import { MenuRequestImpl } from '../src/MenuRequest';

// Jest test syntax:
// test(name, fn, timeout)
// Also under the alias: it(name, fn, timeout)
// So test == it


describe('Constructor', () => {
  it('should set default servings to 1', () => {
    const request = new MenuRequestImpl({ ingredients: ['rice'] });
    expect(request.servings).toBe(1);
  });
  
  it('should set default mealType to any', () => {
    const request = new MenuRequestImpl({ ingredients: ['rice'] });
    expect(request.mealType).toBe('any');
  });
});
