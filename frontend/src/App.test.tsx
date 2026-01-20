import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';


describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    // Just verify something rendered
    expect(container).toBeTruthy();
  });
});