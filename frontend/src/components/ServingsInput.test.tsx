import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ServingsInput } from './ServingsInput';

describe('ServingsInput', () => {
  // 1. Rendering
	it('renders with provided value and correct label', () => {
		// create fake DOM for testing
		const { getByLabelText } = render(
			<ServingsInput value={4} onChange={() => {}} />
		);
		
		// get input by label, it will search all Labels elements and find the one with text "Servings"
		// then it will use the htmlFor attribute to find the associated input element
		const input = getByLabelText("Servings") as HTMLInputElement; // TypeScript needs this cast to access .value property
		
		expect(input.value).toBe('4');
	});

  // // 2. Valid input

  // - [ ] Calls onChange when typing valid number (5)
  // - [ ] Updates display value immediately

  // // 3. Blur validation (most important)
  // - [ ] Auto-corrects to MIN_SERVINGS (1) when empty
  // - [ ] Auto-corrects to MIN_SERVINGS when value < 1
  // - [ ] Auto-corrects to MAX_SERVINGS (12) when value > 12
  // - [ ] Keeps valid value (7) unchanged on blur

  // // 4. Edge cases
  // - [ ] Allows temporary invalid input while typing
  // - [ ] Handles non-numeric input
});
