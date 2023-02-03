/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../../store';
import CartItem from './CartItem';

jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/CardActions', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/CardMedia', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children }) => <button type="button">{children}</button>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/CardContent', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/IconButton', () => ({ children }) => <span>{children}</span>);
jest.mock('@mui/material/TextField', () => ({ children }) => <div>{children}</div>);

describe('CartItem snapshot test', () => {
  test('should CartItem match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CartItem />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
