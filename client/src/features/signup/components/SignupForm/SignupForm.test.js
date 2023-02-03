/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import SignupForm from './SignupForm';

jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Stepper', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Step', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/StepLabel', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/CircularProgress', () => ({ children }) => <div>{children}</div>);
jest.mock('../SignupSuccess/SignupSuccess', () => () => <div>SIGN UP SUCCESS</div>);
jest.mock('../UserInfoForm/UserInfoForm', () => () => <div>USER INFO FORM</div>);

describe('SignupForm snapshot test', () => {
  test('should SignupForm match snapshot', () => {
    const { asFragment } = render(<SignupForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
