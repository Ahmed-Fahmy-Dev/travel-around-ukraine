/* eslint-disable react/prop-types */

import { render } from '@testing-library/react';
import AboutUkraine from './AboutUkraine';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <h2>{children}</h2>);

describe('AboutUkraine snapshot testing', () => {
  test('should render aboutUkraine component', () => {
    const { asFragment } = render(<AboutUkraine />);
    expect(asFragment()).toMatchSnapshot();
  });
});
