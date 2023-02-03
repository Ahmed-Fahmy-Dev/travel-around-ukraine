/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import ContactsForm from './ContactsForm';

jest.mock('@mui/material/TextField', () => ({ children }) => <field>{children}</field>);

describe('ContactsForm snapshot test', () => {
  test('should ContactsForm match snapshot', () => {
    const { asFragment } = render(<ContactsForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});