import React from 'react';
import { styled, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Button = styled((props) => <IconButton color="primary" disableRipple {... props}/>)(({ theme }) => ({
  position: 'absolute',
  height: '60px',
  width: '60px',
  backgroundColor: theme.palette.common.white,
  zIndex: '2',
}));

const SliderButton = ({ id, position }) => (
  <Button id={id} sx={position}>
    <ArrowForwardIosIcon />
  </Button>
);

SliderButton.propTypes = {
  id: PropTypes.string,
  position: PropTypes.object,
};

SliderButton.defaultProps = {
  id: '',
  position: {},
};

export default SliderButton;
