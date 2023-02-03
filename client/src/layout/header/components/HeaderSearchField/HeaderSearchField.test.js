import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import HeaderSearchField from './HeaderSearchField';

jest.mock('@mui/material/InputBase', () => ({ children }) => <input>{children}</input>);

describe('Render HeaderSearchField', () => {
  test('should HeaderSearchField render', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <HeaderSearchField />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
