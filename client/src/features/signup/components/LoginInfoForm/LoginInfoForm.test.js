/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import LoginInfoForm from './LoginInfoForm';

jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);

const FormWrapper = ({ children }) => <Formik>{children}</Formik>;

describe('LoginInfoForm snapshot test', () => {
  test('should LoginInfoForm match snapshot', () => {
    const { asFragment } = render(
      <FormWrapper>
        <LoginInfoForm />
      </FormWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
