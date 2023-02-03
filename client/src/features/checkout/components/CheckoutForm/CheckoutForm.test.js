/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import CheckoutForm from './CheckoutForm';

jest.mock('@mui/material/Stepper', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Step', () => ({ children }) => <ul>{children}</ul>);
jest.mock('@mui/material/StepLabel', () => ({ children }) => <li>{children}</li>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('../../components/CheckoutSummary/CheckoutSummary', () => () => <div>CHECKOUT SUMMARY</div>);
jest.mock('../../components/PaymentSuccess/PaymentSuccess', () => () => <div>PAYMENT SUCCESS</div>);
jest.mock('../../components/UserDetailsForm/UserDetailsForm', () => () => <div>USER DETAILS FORM</div>);

describe('CheckoutForm snapshot test', () => {
  test('should CheckoutForm match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <CheckoutForm />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
