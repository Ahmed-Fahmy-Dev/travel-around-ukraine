/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TotalInfoDialog from './TotalInfoDialog';

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

jest.mock('@mui/material/Button', () => ({ children }) => <button type="button">{children}</button>);
jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);

describe('TotalInfoDialog snapshot test', () => {
  test('should TotalInfoDialog match snapshot', () => {
    const { asFragment } = render(<TotalInfoDialog />, { wrapper: RouterWrapper });

    expect(asFragment()).toMatchSnapshot();
  });
});
