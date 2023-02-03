/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import CartPage from './CartPage';

jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);

jest.mock('../../features/Cart/components/CartItem/CartItem', () => () => <div>Cart item</div>);
jest.mock('../../features/Cart/components/TotalInfoDialog/TotalInfoDialog', () => () => <div>Total info dialog</div>);

describe('CartPage snapshot test', () => {
  test('should CartPage match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
