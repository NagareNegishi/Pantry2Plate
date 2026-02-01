import { cleanup, fireEvent, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

let mockToastError: any;
let mockToastSuccess: any;

// Mock the toast module from sonner
beforeEach(async () => {
  const { toast } = await import('sonner');
  mockToastError = vi.spyOn(toast, 'error');
  mockToastSuccess = vi.spyOn(toast, 'success');

  // Mock scrollIntoView (not available in jsdom)
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

// Clear mocks and cleanup DOM
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock window.matchMedia for components that use media queries (like Sonner)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});


describe('App', () => {
  // 1. Rendering
  it('renders without crashing', () => {
    const { container } = render(<App />);
    // Just verify something rendered
    expect(container).toBeTruthy();
  });

  // 2. button state
  it('button is disabled when ingredients are empty', () => {
    const { getByText } = render(<App />);

    const generateButton = getByText('Generate Menu') as HTMLButtonElement;
    expect(generateButton.disabled).toBe(true);
  });

  it('button is enabled when ingredients are present', () => {
    const { getByText, getByLabelText } = render(<App />);
    
    const input = getByLabelText("Ingredients") as HTMLInputElement;
    // Simulate adding an ingredient
    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const generateButton = getByText('Generate Menu') as HTMLButtonElement;
    expect(generateButton.disabled).toBe(false);
    fireEvent.click(generateButton);
    expect(getByText('Generating...')).toBeTruthy();
  });

  // 3. Successful API call
  it('shows success toast on successful menu generation', async () => {
    const { getByText, getByLabelText, findByText, findAllByText } = render(<App />);
    
    const input = getByLabelText("Ingredients") as HTMLInputElement;
    // Simulate adding an ingredient
    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const generateButton = getByText('Generate Menu') as HTMLButtonElement;
    fireEvent.click(generateButton);

    // Wait for success toast
    const successToast = await findByText('Menu generated successfully!');
    expect(successToast).toBeTruthy();
    expect(mockToastSuccess).toHaveBeenCalledWith('Menu generated successfully!');
    
    // Verify all required sections appear
    expect((await findAllByText(/Recipe/)).length).toBeGreaterThan(0);
    expect((await findAllByText(/Servings:/)).length).toBeGreaterThan(0);
    expect((await findAllByText(/Cooking Time:/)).length).toBeGreaterThan(0);
    expect((await findAllByText(/Difficulty:/)).length).toBeGreaterThan(0);
    expect((await findAllByText(/Ingredients/)).length).toBeGreaterThan(0);
    expect((await findAllByText(/Instructions/)).length).toBeGreaterThan(0);
  });


});