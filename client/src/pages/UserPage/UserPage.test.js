import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import UserPage from './UserPage';
import store from '../../store';

jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Paper', () => ({ children }) => <div>{children}</div>);
jest.mock('../../features/User/components/UserList/UserList', () => ({ children }) => <div>{children}</div>);
jest.mock('../../features/User/components/UserOrders/UserOrders', () => ({ children }) => <div>{children}</div>);

describe('Render UserPage', () => {
  test('should UserPage render', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
