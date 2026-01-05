// // tests/MenuResponseImpl.test.ts
import { describe, expect, it } from '@jest/globals';
import { MenuResponseImpl } from '../src/MenuResponse';

// Import what to test

// fake temp test
describe('MenuResponseImpl', () => {
  it('should create an instance with default values', () => {
    const response = new MenuResponseImpl({});
    expect(response.menus).toEqual([]);

  });
});