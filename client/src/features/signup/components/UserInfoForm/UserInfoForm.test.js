/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import UserInfoForm from './UserInfoForm';

jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Radio', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/FormControlLabel', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/FormLabel', () => ({ children }) => <div>{children}</div>);
jest.mock('formik-mui-x-date-pickers', () => () => <input />);

const LocalizationWrapper = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
);

const FormWrapper = ({ children }) => (
  <Formik>
    <LocalizationWrapper>{children}</LocalizationWrapper>
  </Formik>
);

describe('UserInfoForm snapshot test', () => {
  test('should UserInfoForm match snapshot', () => {
    const { asFragment } = render(
      <FormWrapper>
        <UserInfoForm />
      </FormWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
