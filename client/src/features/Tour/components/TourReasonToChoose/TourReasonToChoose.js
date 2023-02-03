import React, { memo } from 'react';
import { Paper as MuiPaper, styled, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Paper = styled((props) => <MuiPaper elevation={0} {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  maxWidth: '190px',
  padding: '30px 15px',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
  position: 'relative',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-15px',
    left: '-15px',
    width: '57px',
    height: '57px',
    backgroundColor: '#FFC700',
    borderRadius: '50%',
    zIndex: '0',
  },
}));

const BackgroundBox = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: 10,

  zIndex: '0',
});

const TourReasonToChoose = ({ number, description }) => (
  <Paper>
    <BackgroundBox />
    <Box sx={{ position: 'relative' }}>
      <Typography color="primary" fontSize={22} fontWeight={700}>
        {number}
      </Typography>
      <Typography margin="10px 0" fontWeight={700}>
        {description}
      </Typography>
    </Box>
  </Paper>
);

TourReasonToChoose.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default memo(TourReasonToChoose);
