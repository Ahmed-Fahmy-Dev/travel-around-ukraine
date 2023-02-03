import { render } from '@testing-library/react';
import TourAccordion from './TourAccordion';

describe('TourAccordion snapshot testing', () => {
  test('should TourAccordion match snapshot', () => {
    const { asFragment } = render(<TourAccordion />);

    expect(asFragment()).toMatchSnapshot();
  });
});
