/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
jest.mock('@mui/material/Box', () => 'div');
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);

describe('Error page snapshot testing', () => {
  test('should Error page renders', () => {
    const { asFragment } = render(<ErrorPage />, { wrapper: RouterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
