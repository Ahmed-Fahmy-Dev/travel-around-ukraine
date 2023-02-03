/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import AlertModal from './AlertModal';

jest.mock('@mui/material/Button', () => ({ children }) => <button type="button">{children}</button>);
jest.mock('@mui/material/Dialog', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogActions', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogContent', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/DialogContentText', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/DialogTitle', () => ({ children }) => <h3>{children}</h3>);

describe('AlertModal snapshot test', () => {
  test('should AlertModal match snapshot', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    const { asFragment } = render(
      <AlertModal open onClose={onClose} onSubmit={onSubmit} title="Alert modal">
        It is a text content of alert modal
      </AlertModal>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
