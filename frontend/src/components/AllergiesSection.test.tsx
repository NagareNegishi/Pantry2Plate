import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AllergiesSection } from './AllergiesSection';

beforeEach(() => {
  // Mock scrollIntoView
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('AllergiesSection', () => {
  // 1. rendering test
  it('renders all predefined allergies as checkboxes', () => {
    const { getByText, getByLabelText } = render(
      <AllergiesSection
        value={[]}
        onChange={() => {}}
        customValue={[]}
        onCustomChange={() => {}}
      />
    );

    // Open the accordion
    const trigger = getByText('Allergies');
    fireEvent.click(trigger);
    expect(getByLabelText('Peanuts')).toBeTruthy();
    expect(getByLabelText('Tree nuts')).toBeTruthy();
    expect(getByLabelText('Milk')).toBeTruthy();
  });

  // 2. interaction test
});