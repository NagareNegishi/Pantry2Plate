import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ServingsInput } from './ServingsInput';
// https://testing-library.com/docs/user-event/intro/
import userEvent from '@testing-library/user-event';

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

  // 2. Valid input
	// Note: use userEvent for more realistic typing simulation
	// Pattern:
	// 1. Always async function
	// 2. Setup userEvent
	// (3. Create mock function for onChange)
	// 4. Render component
	// 5. Get input element
	// 6. Simulate user typing with user.type (awaited)
	// 7. Assert mock function called with expected value(s)
	it('updates display value when user types', async () => {
		const user = userEvent.setup();
		const { getByLabelText } = render(
			<ServingsInput value={4} onChange={() => {}} />
		);
		const input = getByLabelText("Servings") as HTMLInputElement;
		
		await user.clear(input);
		await user.type(input, '7');
		expect(input.value).toBe('7');
	});

  // 3. Blur validation
  it('auto-corrects to MIN_SERVINGS when empty', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(
      <ServingsInput value={4} onChange={() => {}} />
    );
    const input = getByLabelText("Servings") as HTMLInputElement;
    
    await user.clear(input);
    await user.tab(); // Triggers blur
    
    expect(input.value).toBe('1');
  });

  it('auto-corrects to MIN_SERVINGS when value too low', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(
      <ServingsInput value={4} onChange={() => {}} />
    );
    const input = getByLabelText("Servings") as HTMLInputElement;
    
    await user.clear(input);
    await user.type(input, '0');
    await user.tab();
    
    expect(input.value).toBe('1');
  });

  it('auto-corrects to MAX_SERVINGS when value too high', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(
      <ServingsInput value={4} onChange={() => {}} />
    );
    const input = getByLabelText("Servings") as HTMLInputElement;
    
    await user.clear(input);
    await user.type(input, '99');
    await user.tab();
    
    expect(input.value).toBe('12');
  });

  it('keeps valid value unchanged on blur', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(
      <ServingsInput value={4} onChange={() => {}} />
    );
    const input = getByLabelText("Servings") as HTMLInputElement;
    
    await user.clear(input);
    await user.type(input, '7');
    await user.tab();
    
    expect(input.value).toBe('7');
  });



  // // 4. Edge cases
  // - [ ] Allows temporary invalid input while typing
  // - [ ] Handles non-numeric input
});
