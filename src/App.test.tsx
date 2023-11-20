import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/(Trip Planner|多元運具轉乘規劃系統)/i);
  expect(linkElement).toBeInTheDocument();
});
