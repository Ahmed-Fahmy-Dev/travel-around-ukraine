import { render } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { Provider } from 'react-redux';
import store from '../../store';
import TourPage from './TourPage';

jest.mock('@mui/material/Box', () => 'div');
jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Slide', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Link', () => ({ children }) => <a>{children}</a>);
jest.mock('../../features/Tour/components/TourAccordion/TourAccordion', () => ({ children }) => <div>{children}</div>);
jest.mock('../../features/Tour/components/TourInfoDialog/TourInfoDialog', () => () => <div>TourInfoDialog</div>);
jest.mock('../../features/Tour/components/TourReasonToChoose/TourReasonToChoose', () => () => (
  <div>TourReasonToChoose</div>
));

const mockedMatchesMediaQuery = true;
jest.mock('@mui/material/useMediaQuery', () => jest.fn(() => mockedMatchesMediaQuery));

describe('Tour Page snapshot testing', () => {
  test('should Tour Page match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TourPage />
      </Provider>
    );
    mockAllIsIntersecting(true);

    expect(asFragment()).toMatchSnapshot();
  });
});
