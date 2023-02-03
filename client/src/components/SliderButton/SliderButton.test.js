import { render } from '@testing-library/react';
import SliderButton from './SliderButton';

jest.mock('@mui/material/IconButton', () => ({ children }) => <button>{children}</button>);

describe('SliderButton snapshot test', () => {
  test('should SliderButton match snapshot', () => {
    const { asFragment } = render(<SliderButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
