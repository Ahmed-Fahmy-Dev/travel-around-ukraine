/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import PaymentSuccess from './PaymentSuccess';

jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Dialog', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogContent', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogActions', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogTitle', () => ({ children }) => <h3>{children}</h3>);
jest.mock('@mui/icons-material/CheckCircleOutlineRounded', () => () => <div>ICON</div>);

const steps = ['User Details', 'Shipping Address', 'Payment Details'];

describe('PaymentSuccess snapshot test', () => {
  test('should PaymentSuccess render null', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <PaymentSuccess steps={steps} activeStep={0} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should PaymentSuccess render modal window', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <PaymentSuccess steps={steps} activeStep={3} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
