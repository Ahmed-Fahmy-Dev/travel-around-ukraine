import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styled, Stack, CardMedia, Typography, CardContent, Box } from '@mui/material';
import { ReactComponent as CoinsIcon } from '../../../../assets/svg/CoinsIcon.svg';

const PoductImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: 240,
  borderRadius: '10px 10px 0 0',

  [theme.breakpoints.up('laptop')]: {
    width: 250,
    height: 'auto',
    borderRadius: '10px 0 0 10px',
  },
}));

const productContainerSX = {
  backgroundColor: 'primary.contrastText',
  borderRadius: '25px',
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
  maxWidth: '1000px',
  margin: '20px',
  cursor: 'pointer',
  flexDirection: { xs: 'column', laptop: 'row' },
};

const productTitleSX = {
  color: 'text.primary',
  marginTop: '20px',
  marginBottom: '20px',
  textTransform: 'uppercase',
};

const TourDescriptionSX = {
  borderLeft: '3px solid',
  borderColor: 'primary.main',
  paddingLeft: '24px',
  height: '50px',
  overflow: 'hidden',
  WebkitLineClamp: '3',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
};

const Product = ({ name, currentPrice, itemNo, image, cartQuantity, description }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/tour/${itemNo}`);

  return (
    <Stack component="li" onClick={handleClick} sx={productContainerSX} spacing={1}>
      <PoductImage component="img" image={image} alt="tour photo" />
      <CardContent sx={{ p: ' 0 5%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={productTitleSX}>
            {name}
          </Typography>
        </Box>
        <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: '20px' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CoinsIcon />
            <Typography
              sx={{ fontWeight: 500, fontSize: { xs: '14px', mobile: '16px', tablet: '18px' } }}
              variant="h3"
              component="span"
            >
              {currentPrice} €
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              sx={{ mb: 0, fontWeight: 500, fontSize: { xs: '14px', mobile: '16px', tablet: '18px' } }}
              variant="h3"
              component="span"
            >
              Pieces: {cartQuantity}
            </Typography>
          </Stack>
        </Stack>
        <Typography sx={TourDescriptionSX}>{description}</Typography>
      </CardContent>
    </Stack>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  itemNo: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  cartQuantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Product;
