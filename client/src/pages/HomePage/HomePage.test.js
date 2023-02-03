/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

jest.mock('@mui/material/Box', () => ({ children }) => <section>{children}</section>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <h1>{children}</h1>);
jest.mock('@mui/material/Button', () => () => <button>MUI COMPONENT</button>);
jest.mock('../../features/Home/components/ImageCarousel/ImageCarousel', () => () => <div>IMAGE CAROUSEL</div>);
jest.mock('../../features/Home/components/AboutUkraine/AboutUkraine', () => () => <div>ABOUT UKRAINE</div>);
jest.mock('../../features/Home/components/CardContainer/CardContainer', () => () => <div>CARD CONTAINER</div>);

describe('Home page Snapshot test', () => {
  test('should HomePage match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
