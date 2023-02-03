/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import SignupPage from './SignupPage';

jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('../../features/signup/components/SignupForm/SignupForm', () => () => <div>SIGN UP FORM</div>);

describe('SignupPage snapshot test', () => {
  test('should SignupPage match snapshot', () => {
    const { asFragment } = render(<SignupPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
