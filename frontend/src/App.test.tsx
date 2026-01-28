import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

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
  it('renders without crashing', () => {
    const { container } = render(<App />);
    // Just verify something rendered
    expect(container).toBeTruthy();
  });
});