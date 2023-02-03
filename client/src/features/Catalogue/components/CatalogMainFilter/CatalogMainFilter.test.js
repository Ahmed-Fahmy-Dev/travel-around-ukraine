import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../../store';
import CatalogMainFilter from './CatalogMainFilter';

jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <h3>{children}</h3>);
jest.mock('@mui/material/Unstable_Grid2', () => ({ children }) => <div>{children}</div>);

jest.mock('../CatalogFilterPrice/CatalogFilterPrice', () => () => <div>CATALOGUE FILTER PRICE</div>);
jest.mock('../CatalogFilterSeason/CatalogFilterSeason', () => () => <div>CATALOGUE FILTER TOURISTS</div>);
jest.mock('../CatalogFilterCategories/CatalogFilterCategories', () => () => <div>CATALOGUE FILTER REGION</div>);

describe('CatalogMainFilter snapshot test', () => {
  test('should CatalogTourCard match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CatalogMainFilter />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
