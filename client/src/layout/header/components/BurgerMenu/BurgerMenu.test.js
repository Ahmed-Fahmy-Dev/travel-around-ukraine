import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../store';
import BurgerMenu from './BurgerMenu';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/MenuItem', () => ({ children }) => <li>{children}</li>);
jest.mock('@mui/material/Menu', () => ({ children }) => <ul>{children}</ul>);
jest.mock('@mui/material/IconButton', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Typography', () => ({ children }) => <a>{children}</a>);

describe('Render BurgerMenu', () => {
  test('should BurgerMenu render', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BurgerMenu isLogin />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
