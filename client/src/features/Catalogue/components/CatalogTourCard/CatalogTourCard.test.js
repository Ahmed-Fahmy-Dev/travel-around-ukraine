import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../store';
import CatalogTourCard from './CatalogTourCard';

jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/CardActions', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/CardMedia', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/CardContent', () => ({ children }) => <div>{children}</div>);

describe('CatalogTourCard snapshot test', () => {
  test('should CatalogTourCard match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CatalogTourCard
            name="ItemName"
            description="Itemdescription"
            currentPrice={1}
            duration="ItemDuration"
            imageUrls={['ItemImage']}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
