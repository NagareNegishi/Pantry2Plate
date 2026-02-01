import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AllergiesSection } from './AllergiesSection';


let mockToastError: any;
let mockToastSuccess: any;
let mockToastInfo: any;

beforeEach(async () => {
  const { toast } = await import('sonner');
  mockToastError = vi.spyOn(toast, 'error');
  mockToastSuccess = vi.spyOn(toast, 'success');
  mockToastInfo = vi.spyOn(toast, 'info');
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

  // 3. custom allergy addition test
  it('shows custom input when "other" is selected and adds custom allergy', () => {
    const mockOnChange = vi.fn();
    const mockOnCustomChange = vi.fn();
    const { getByText, getByLabelText, getByPlaceholderText, rerender } = render(
      <AllergiesSection
        value={[]}
        onChange={mockOnChange}
        customValue={[]}
        onCustomChange={mockOnCustomChange}
      />
    );
    
    fireEvent.click(getByText('Allergies'));
    fireEvent.click(getByLabelText('Other'));
    expect(mockOnChange).toHaveBeenCalledWith(['other']);
    
    // Rerender with "other" selected
    rerender(
      <AllergiesSection
        value={['other']}
        onChange={mockOnChange}
        customValue={[]}
        onCustomChange={mockOnCustomChange}
      />
    );
    
    // Custom input should appear
    const customInput = getByPlaceholderText('Enter allergies') as HTMLInputElement;
    
    // Type custom allergy and press Enter
    fireEvent.change(customInput, { target: { value: 'garlic' } });
    fireEvent.keyDown(customInput, { key: 'Enter' });
    expect(mockOnCustomChange).toHaveBeenCalledWith(['garlic']);
  });
  
  // 4. invalid custom allergy format test
  it('shows error for invalid custom allergy format', () => {
    const { getByText, getByPlaceholderText } = render(
      <AllergiesSection
        value={['other']}
        onChange={() => {}}
        customValue={[]}
        onCustomChange={() => {}}
      />
    );
    
    fireEvent.click(getByText('Allergies'));
    const customInput = getByPlaceholderText('Enter allergies');
    fireEvent.change(customInput, { target: { value: 'garlic123' } });
    fireEvent.keyDown(customInput, { key: 'Enter' });
    
    expect(mockToastError).toHaveBeenCalledWith(
      "Invalid allergies",
      expect.objectContaining({
        description: "Use only letters, spaces, and hyphens (1-20 characters)"
      })
    );
  });

  // 5. duplicate custom allergy test
  it('shows error for duplicate custom allergy', () => {
    const { getByText, getByPlaceholderText } = render(
      <AllergiesSection
        value={['other']}
        onChange={() => {}}
        customValue={['garlic']}
        onCustomChange={() => {}}
      />
    );
    
    fireEvent.click(getByText('Allergies'));
    const customInput = getByPlaceholderText('Enter allergies');
    fireEvent.change(customInput, { target: { value: 'garlic' } });
    fireEvent.keyDown(customInput, { key: 'Enter' });
    
    expect(mockToastError).toHaveBeenCalledWith(
      "Duplicate allergy",
      expect.objectContaining({
        description: '"garlic" is already in the list'
      })
    );
  });

  // 6. conflict with predefined allergy test
  it('auto-selects predefined allergy when typed in custom input', () => {
    const mockOnChange = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <AllergiesSection
        value={['other']}
        onChange={mockOnChange}
        customValue={[]}
        onCustomChange={() => {}}
      />
    );
    
    fireEvent.click(getByText('Allergies'));
    const customInput = getByPlaceholderText('Enter allergies');
    fireEvent.change(customInput, { target: { value: 'peanuts' } });
    fireEvent.keyDown(customInput, { key: 'Enter' });
    
    // Should call onChange to select predefined allergy, not add custom
    expect(mockOnChange).toHaveBeenCalledWith(['other', 'peanuts']);
    expect(mockToastSuccess).toHaveBeenCalledWith(
      "Selected predefined allergy",
      expect.objectContaining({
        description: '"peanuts" has been selected from predefined options'
      })
    );
  });

  // 7. already selected predefined allergy test
  it('shows info toast when predefined allergy is already selected', () => {
    const { getByText, getByPlaceholderText } = render(
      <AllergiesSection
        value={['other', 'peanuts']} // peanuts already selected
        onChange={() => {}}
        customValue={[]}
        onCustomChange={() => {}}
      />
    );
    
    fireEvent.click(getByText('Allergies'));
    const customInput = getByPlaceholderText('Enter allergies');
    fireEvent.change(customInput, { target: { value: 'peanuts' } });
    fireEvent.keyDown(customInput, { key: 'Enter' });
    
    expect(mockToastInfo).toHaveBeenCalledWith(
      "Already selected",
      expect.objectContaining({
        description: '"peanuts" is already checked'
      })
    );
  });


});