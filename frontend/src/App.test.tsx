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



});