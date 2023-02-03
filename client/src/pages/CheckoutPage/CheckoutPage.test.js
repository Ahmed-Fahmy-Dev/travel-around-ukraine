/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import CheckoutPage from './CheckoutPage';

jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('../../features/checkout/components/CheckoutForm/CheckoutForm', () => ({ children }) => (
  <div>CHECKOUT FORM</div>
));

describe('CheckoutPage snapshot test', () => {
  test('should CheckoutPage match snapshot', () => {
    const { asFragment } = render(<CheckoutPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
