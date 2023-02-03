import { render } from '@testing-library/react';
import UserList from './UserList';

jest.mock('@mui/material/Typography', () => ({ children }) => <li>{children}</li>);
jest.mock('@mui/material/Box', () => ({ children }) => <ul>{children}</ul>);
jest.mock('@mui/material/Paper', () => ({ children }) => <div>{children}</div>);

const userData = {
  firstName: 'Roman',
  email: 'Rymarchuk@gmail.com',
  telephone: '38000000000',
  gender: 'male',
};

describe('Render UserList', () => {
  test('should UserList render', () => {
    const { asFragment } = render(<UserList userData={userData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
