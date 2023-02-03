/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import UserDetailsForm from './UserDetailsForm';
import formModel from '../../data';

jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);

const FormikWrapper = ({ children }) => <Formik>{children}</Formik>;

describe('UserDetailsForm snapshot test', () => {
  test('should UserDetailsForm match snapshot', () => {
    const { asFragment } = render(
      <FormikWrapper>
        <UserDetailsForm checkoutFormModel={formModel} />
      </FormikWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
