import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import CatalogFilterDuration from './CatalogFilterDuration';

jest.mock('@mui/material/ToggleButton', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Unstable_Grid2', () => ({ children }) => <div>{children}</div>);

jest.mock('../FilterAccordion/FilterAccordion', () => ({ children }) => <div>{children}</div>);
jest.mock('../OutlinedToggleButton/OutlinedToggleButton', () => () => <button>test button</button>);

describe('CatalogFilterDuration snapshot test', () => {
  test('should CatalogFilterDuration match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <CatalogFilterDuration />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
