import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import TourInfoDialog from './TourInfoDialog';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/IconButton', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Select', () => ({ children }) => <select>{children}</select>);
jest.mock('@mui/material/MenuItem', () => ({ children }) => <option>{children}</option>);

const included = [
  { icon: '', service: 'Professional guide' },
  { icon: '', service: 'Accomodation' },
];

const cost = {
  eur: 70,
  usd: 70,
  uah: 2584,
};

const dates = { beginDate: new Date('2022-02-01'), endDate: new Date('2022-02-25') };

const details = {
  duration: '3 days',
  departs: 'First city',
  returns: 'Second city',
};

describe('TourInfoDialog snapshot testing', () => {
  test('should TourInfoDialog without close button match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TourInfoDialog included={included} cost={cost} dates={dates} details={details} />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should TourInfoDialog with close button match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TourInfoDialog included={included} cost={cost} dates={dates} details={details} closeButton />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
