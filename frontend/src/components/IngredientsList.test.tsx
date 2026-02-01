import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IngredientsList } from './IngredientsList';

let mockToastError: any;

// Mock the toast module from sonner
beforeEach(async () => {
  const { toast } = await import('sonner');
  mockToastError = vi.spyOn(toast, 'error');
});

// Clear mocks and cleanup DOM
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('IngredientsList', () => {
  // 1. Rendering
	it('renders with provided value and correct label', () => {
		// create fake DOM for testing
		const { getByLabelText } = render(
			<IngredientsList value={[]} onChange={() => {}} />
		);
		
		// get input by label, it will search all Labels elements and find the one with text "Ingredients"
		// then it will use the htmlFor attribute to find the associated input element
		const input = getByLabelText("Ingredients") as HTMLInputElement; // TypeScript needs this cast to access .value property
		expect(input.value).toBe('');
	});

  // 2. Valid input
	it('updates display value when user types', async () => {
		const user = userEvent.setup();
		const { getByLabelText } = render(
			<IngredientsList value={[]} onChange={() => {}} />
		);
		const input = getByLabelText("Ingredients") as HTMLInputElement;
		
		await user.clear(input);
		await user.type(input, 'chicken');
		expect(input.value).toBe('chicken');
	});

  it('displays badge after adding ingredient', async () => {
    const mockOnChange = vi.fn();
    const { getByLabelText, rerender, getByText } = render(
      <IngredientsList value={[]} onChange={mockOnChange} />
    );
    const input = getByLabelText("Ingredients") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnChange).toHaveBeenCalledWith(['chicken']);
    expect(input.value).toBe(''); // Verifies input cleared

    // Manually re-render with updated value (simulating what parent would do)
    rerender(<IngredientsList value={['chicken']} onChange={mockOnChange} />);
    expect(getByText('Chicken')).toBeTruthy();
  });

  it('displays badges for provided ingredients', () => {
    const { getByText } = render(
      <IngredientsList value={['chicken', 'rice']} onChange={() => {}} />
    );
    expect(getByText('Chicken')).toBeTruthy();
    expect(getByText('Rice')).toBeTruthy();
  });

  // 3. Error handling
  it('shows error toast for invalid format', () => {
      const { getByLabelText } = render(
        <IngredientsList value={[]} onChange={() => {}} />
      );
      const input = getByLabelText("Ingredients") as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'chicken123' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(mockToastError).toHaveBeenCalledWith(
        "Invalid ingredient",
        expect.objectContaining({
          description: "Use only letters, spaces, and hyphens (1-20 characters)"
        })
      );
    });

  it('shows error toast for duplicate ingredient', () => {
      const { getByLabelText } = render(
        <IngredientsList value={['chicken']} onChange={() => {}} />
      );
      const input = getByLabelText("Ingredients") as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'chicken' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(mockToastError).toHaveBeenCalledWith(
        "Duplicate ingredient",
        expect.objectContaining({
          description: `"chicken" is already in the list`
        })
      );
    });


});
