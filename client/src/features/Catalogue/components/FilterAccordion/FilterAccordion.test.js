import { render } from '@testing-library/react';
import FilterAccordion from './FilterAccordion';

jest.mock('@mui/material/Accordion', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/AccordionSummary', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/AccordionDetails', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);


describe('FilterAccordion snapshot test', () => {
  test('should FilterAccordion match snapshot', () => {
    const { asFragment } = render(<FilterAccordion />);
    expect(asFragment()).toMatchSnapshot();
  });
});
