import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import PropTypes from 'prop-types';

const ListSX = {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  maxWidth: '400px',
  minWidth: '250px',
  py: '20px',
  px: 2,
  listStyleType: 'none',
  m: '2% auto',
};

const listItemSX = {
  m: { xs: '15px' },
};

const listItemTitleSX = {
  color: 'primary.main',
  fontSize: '20px',
};

const listItemInnerTextSX = { my: '2px', fontSize: '18px', mx: { tablet: '20px' } };

const UserList = ({ userData: { firstName, email, telephone, gender } }) => (
  <Paper component="ul" sx={ListSX}>
    <Typography sx={{ m: '15px auto', fontSize: '24px' }} component="h3">
      {firstName}&apos;s info
    </Typography>
    <Box sx={listItemSX} component="li">
      <Typography sx={listItemTitleSX}>Email: </Typography>
      <Typography sx={listItemInnerTextSX}>{email} </Typography>
    </Box>
    <Box sx={listItemSX} component="li">
      <Typography sx={listItemTitleSX}>Phone: </Typography>
      <Typography sx={listItemInnerTextSX}>{telephone} </Typography>
    </Box>
    <Box sx={listItemSX} component="li">
      <Typography sx={listItemTitleSX}>Gender: </Typography>
      <Typography sx={listItemInnerTextSX}>{gender} </Typography>
    </Box>
  </Paper>
);

UserList.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserList;
