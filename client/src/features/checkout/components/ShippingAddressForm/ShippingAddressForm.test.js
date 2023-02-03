/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import ShippingAddressForm from './ShippingAddressForm';
import formModel from '../../data';

jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);

const FormikWrapper = ({ children }) => <Formik>{children}</Formik>;

describe('ShippingAddressForm snapshot test', () => {
  test('should ShippingAddressForm match snapshot', () => {
    const { asFragment } = render(
      <FormikWrapper>
        <ShippingAddressForm checkoutFormModel={formModel} />
      </FormikWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
