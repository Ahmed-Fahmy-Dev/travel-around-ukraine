import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material/';

const SnackBar = ({ severity, text, handleClose, isOpen }) => (
  // the component receives 4 props necessary for it to function properly=
  // severity might be one of the following values: error, warning, info, success and it controls the color of the snackbar
  // text: the text to be displayed in the snackbar
  // handleClose a function which sets IsOpen state to false, handleClose and setIsOpen to be encapsulated in parent component
  // IsOpen which holds a Boolean value of true or false and controls whether the snackbar appears or disappears

  <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
    <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '20vw', minWidth: '270px' }}>
      {text}
    </Alert>
  </Snackbar>
);

SnackBar.propTypes = {
  severity: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SnackBar;
