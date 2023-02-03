/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupSuccess from './SignupSuccess';

jest.mock('@mui/material/Dialog', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogContent', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogActions', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogTitle', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/icons-material/CheckCircleOutlineRounded', () => () => <div>SUCCESS ICON</div>);

const FormWrapper = ({ children }) => <MemoryRouter>{children} </MemoryRouter>;
const steps = ['User Info', 'Login Info'];

describe('SignupSuccess snapshot test', () => {
  test('should SignupSuccess snapshot render', () => {
    const { asFragment } = render(
      <FormWrapper>
        <SignupSuccess steps={steps} activeStep={steps.length} />
      </FormWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should SignupSuccess snapshot render null', () => {
    const { asFragment } = render(
      <FormWrapper>
        <SignupSuccess steps={steps} activeStep={0} />
      </FormWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
