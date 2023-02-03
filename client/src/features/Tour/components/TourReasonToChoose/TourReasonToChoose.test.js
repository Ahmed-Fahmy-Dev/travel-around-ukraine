import { render } from '@testing-library/react';
import TourReasonToChoose from './TourReasonToChoose';

jest.mock('@mui/material/Paper', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);

describe('TourReasonToChoose snapshot testing', () => {
  test('should TourReasonToChoose match snapshot', () => {
    const { asFragment } = render(<TourReasonToChoose number={1} description="test" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
