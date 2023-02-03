/* eslint-disable no-unneeded-ternary */
import {
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Button = styled(MuiButton)({
  padding: '12px 24px',
});

const AlertModal = ({ open, onClose, onSubmit, title, children, disableCancelButton, submitButtonText, success }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ paddingBottom: 2 }}>
      {!disableCancelButton && (
        <Button onClick={onClose} disableElevation>
          Cancel
        </Button>
      )}

      <Button onClick={onSubmit} success={success === 'true' ? 'true' : null} disableElevation autoFocus>
        {submitButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  disableCancelButton: PropTypes.bool,
  submitButtonText: PropTypes.string,
  success: PropTypes.bool,
};

AlertModal.defaultProps = {
  title: 'Alert!',
  disableCancelButton: false,
  submitButtonText: 'Submit',
  success: false,
};

export default AlertModal;
