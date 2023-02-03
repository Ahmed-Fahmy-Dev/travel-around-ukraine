import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardItem from './CardItem';

jest.mock('@mui/material/Typography', () => ({ children }) => <h2>{children}</h2>);
jest.mock('@mui/material/Box', () => ({ children }) => <img alt="test img" />);

describe('Card Item Snapshot test', () => {
  test('should CardItem match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CardItem name="name" region="region" currentPrice={100} itemNo="number" imageUrls={['url']} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
