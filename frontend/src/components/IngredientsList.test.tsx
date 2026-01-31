import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { IngredientsList } from './IngredientsList';

afterEach(cleanup);

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



  // // 3. Blur validation
  // it('auto-corrects to MIN_SERVINGS when empty', async () => {
  //   const user = userEvent.setup();
  //   const { getByLabelText } = render(
  //     <IngredientsList value={[]} onChange={() => {}} />
  //   );
  //   const input = getByLabelText("Ingredients") as HTMLInputElement;
    
  //   await user.clear(input);
  //   await user.tab(); // Triggers blur
    
  //   expect(input.value).toBe('1');
  // });

  // it('auto-corrects to MIN_SERVINGS when value too low', async () => {
  //   const user = userEvent.setup();
  //   const { getByLabelText } = render(
  //     <IngredientsList value={[]} onChange={() => {}} />
  //   );
  //   const input = getByLabelText("Ingredients") as HTMLInputElement;
    
  //   await user.clear(input);
  //   await user.type(input, '0');
  //   await user.tab();
    
  //   expect(input.value).toBe('1');
  // });

  // it('auto-corrects to MAX_SERVINGS when value too high', async () => {
  //   const user = userEvent.setup();
  //   const { getByLabelText } = render(
  //     <IngredientsList value={[]} onChange={() => {}} />
  //   );
  //   const input = getByLabelText("Ingredients") as HTMLInputElement;
    
  //   await user.clear(input);
  //   await user.type(input, '99');
	// 	expect(input.value).toBe('99');
  //   await user.tab();
  //   expect(input.value).toBe('12');
  // });

  // it('keeps valid value unchanged on blur', async () => {
  //   const user = userEvent.setup();
  //   const { getByLabelText } = render(
  //     <IngredientsList value={[]} onChange={() => {}} />
  //   );
  //   const input = getByLabelText("Ingredients") as HTMLInputElement;
    
  //   await user.clear(input);
  //   await user.type(input, '7');
  //   await user.tab();
    
  //   expect(input.value).toBe('7');
  // });
});
