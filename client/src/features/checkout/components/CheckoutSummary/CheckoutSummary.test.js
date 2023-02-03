/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import CheckoutSummary from './CheckoutSummary';

jest.mock('@mui/material/Typography', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);

describe('CheckoutSummary snapshot test', () => {
  test('should CheckoutSummary match snapshot', () => {
    const { asFragment } = render(<CheckoutSummary />);
    expect(asFragment()).toMatchSnapshot();
  });
});
