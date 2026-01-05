// // tests/MenuResponseImpl.test.ts
import { describe, expect, it } from '@jest/globals';
import { MenuResponseImpl } from '../src/MenuResponse';

// Constructor tests
describe('MenuResponseImpl', () => {
  it('should set all default values when no data provided', () => {
    const response = new MenuResponseImpl({});
    expect(response.menus).toEqual([]);
  });
});