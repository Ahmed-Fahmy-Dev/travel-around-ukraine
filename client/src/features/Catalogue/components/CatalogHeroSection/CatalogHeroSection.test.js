import { render } from '@testing-library/react';
import CatalogHeroSection from './CatalogHeroSection';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);

describe('CatalogMainSection snapshot testing', () => {
  test('should CatalogMainSection match snapshot', () => {
    const { asFragment } = render(<CatalogHeroSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
