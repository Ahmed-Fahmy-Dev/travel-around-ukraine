import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import OutlinedToggleButton from './OutlinedToggleButton';

jest.mock('@mui/material/ToggleButton', () => ({ children }) => <button>{children}</button>);

describe('OutlinedToggleButton snapshot test', () => {
  test('should OutlinedToggleButton match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <OutlinedToggleButton />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
