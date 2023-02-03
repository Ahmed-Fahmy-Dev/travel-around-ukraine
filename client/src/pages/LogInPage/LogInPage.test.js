import LogInPage from './LogInPage';
import { render } from '@testing-library/react';

jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Slide', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('../../features/LogIn/components/LogInForm', () => ({ children }) => <div>{children}</div>);

describe('Render LogInPage', () => {
  test('should LogInPage render', () => {
    const { asFragment } = render(<LogInPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
