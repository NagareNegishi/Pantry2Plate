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
  it('displays badge when allergy is selected', () => {
    const mockOnChange = vi.fn();
    const { getByText, getByLabelText, getAllByText, rerender, getAllByRole } = render(
      <AllergiesSection
        value={[]}
        onChange={mockOnChange}
        customValue={[]}
        onCustomChange={() => {}}
      />
    );
    
    fireEvent.click(getByText('Allergies'));
    let peanutsElements = getAllByText('Peanuts');
    expect(peanutsElements.length).toBe(1); // only label initially
    fireEvent.click(getByLabelText('Peanuts'));
    expect(mockOnChange).toHaveBeenCalledWith(['peanuts']);
    
    // Rerender with updated props
    rerender(
      <AllergiesSection
        value={['peanuts']}
        onChange={mockOnChange}
        customValue={[]}
        onCustomChange={() => {}}
      />
    );
    
    peanutsElements = getAllByText('Peanuts');
    expect(peanutsElements.length).toBe(2); // label + badge
    // Badge has a delete button
    const deleteButtons = getAllByRole('button');
    const deleteBadge = deleteButtons.find(btn =>
      btn.className.includes('absolute')
    );
    expect(deleteBadge).toBeTruthy();
  });
  
});