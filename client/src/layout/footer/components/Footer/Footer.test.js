/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
jest.mock('@mui/material/Box', () => 'div');
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Link', () => ({ children }) => <a>{children}</a>);
describe('Footer snapshot testing', () => {
  test('should Footer renders', () => {
    const { asFragment } = render(<Footer />, { wrapper: RouterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
