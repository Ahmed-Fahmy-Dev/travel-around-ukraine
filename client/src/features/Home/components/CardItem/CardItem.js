import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, styled } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const CardItemWrapper = styled('div')({
  minWidth: '265px',
  maxWidth: '265px',
  height: '400px',
  backgroundSize: 'cover',
  color: 'white',
  position: 'relative',
  cursor: 'pointer',

  '&::after': {
    content: "''",
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    left: '0',
    top: '0',
    transition: 'opacity 0.5s',
    opacity: '1',
  },

  '&:hover::after': {
    opacity: '0',
    cursor: 'pointer',
  },
});

const CardItemPrice = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  textAlign: 'center',
  width: '108px',
  fontSize: '18px',
  paddingTop: '19px',
  paddingBottom: '19px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  marginTop: '0',
  position: 'absolute',
  zIndex: '1',
  color: theme.palette.common.white,
}));

const CardItemHeader = styled((props) => <Typography variant="h3" {...props} />)(({ theme }) => ({
  position: 'absolute',
  marginTop: '250px',
  paddingLeft: '25px',
  paddingRight: '25px',
  zIndex: '2',
  textTransform: 'uppercase',
  color: theme.palette.common.white,
}));

const CardItemLocation = styled('div')({
  height: '20px',
  display: 'flex',
  paddingLeft: '25px',
  paddingRight: '25px',
  zIndex: '2',
  position: 'absolute',
  width: '215px',
  alignItems: 'center',
  marginTop: '350px',
});

const CardItemText = styled(Typography)(({ theme }) => ({
  margin: '0',
  whiteSpace: 'nowrap',
  color: theme.palette.common.white,
}));

const CardItem = ({ name, region, currentPrice, imageUrls, itemNo }) => {
  const navigate = useNavigate();
  const url = imageUrls[0];
  //   console.log(url);

  return (
    <CardItemWrapper
      onClick={() => navigate(`/tour/${+itemNo}`)}
      sx={{
        height: '400px',
        backgroundImage: `url(${url})`,
      }}
    >
      <CardItemPrice>{currentPrice} $</CardItemPrice>
      <CardItemHeader>{name}</CardItemHeader>
      <CardItemLocation>
        <Box
          component="img"
          src="https://visitukraine.today/assets/img/fromukraine/maps-and-flags.png"
          alt="location"
          sx={{ paddingRight: '10px', maxWidth: 'min-content' }}
        />
        <CardItemText>{region} region</CardItemText>
        <ArrowForwardIosIcon sx={{ display: 'block', marginLeft: 'auto' }} fontSize="small" />
      </CardItemLocation>
    </CardItemWrapper>
  );
};

CardItem.propTypes = {
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  imageUrls: PropTypes.array.isRequired,
  itemNo: PropTypes.string.isRequired,
};

export default memo(CardItem);
