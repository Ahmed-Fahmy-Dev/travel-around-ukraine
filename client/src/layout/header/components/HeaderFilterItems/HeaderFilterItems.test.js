/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import HeaderFilterItems from './HeaderFilterItems';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/MenuList', () => ({ children }) => <ul>{children}</ul>);
jest.mock('@mui/material/MenuItem', () => ({ children }) => <li>{children}</li>);
jest.mock('@mui/material/Paper', () => ({ children }) => <div>{children}</div>);

describe('HeaderFilterItems snapshot testing', () => {
  test('should render HeaderFilterItems component', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <HeaderFilterItems />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
