import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../store';
import TabletMenu from './TabletMenu';

jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);

describe('Render TabletMenu', () => {
  test('should TabletMenu render', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TabletMenu isLogin />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
