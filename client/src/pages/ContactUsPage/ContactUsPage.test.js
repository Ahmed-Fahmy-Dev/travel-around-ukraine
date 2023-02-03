/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import ContactsUsPage from './ContactUsPage'

jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <span>{children}</span>);


describe('HeaderFilterItems snapshot testing', () => {
  test('should render ContactsUsPage component', () => {
    const { asFragment } = render(<ContactsUsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});