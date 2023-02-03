/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Container, Typography, Box, styled } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
import { AboutUkraine, ImageCarousel, CardContainer } from '../../features/Home/components';

const TravelText = styled((props) => <Typography variant="h1" {...props} />)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '44px',
  color: 'white',

  position: 'relative',
  margin: 0,
  marginBottom: '12px',

  [theme.breakpoints.up('tablet')]: {
    fontSize: '48px',
    lineHeight: '59px',
  },

  [theme.breakpoints.up('laptop')]: {
    fontSize: '72px',
    lineHeight: '88px',
  },

  '.heroHeaderHighlighted': {
    fontFamily: 'Pacifico',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '18px',
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,

    position: 'absolute',
    bottom: '-35%',
    right: '40%',

    [theme.breakpoints.up('tablet')]: {
      fontSize: '28px',
      lineHeight: '28px',
      right: '45%',
      bottom: '-30%',
    },

    [theme.breakpoints.up('laptop')]: {
      fontSize: '32px',
      lineHeight: '32px',
      right: '47%',
      bottom: '-25%',
    },

    [theme.breakpoints.up('desktop')]: {
      right: '62%',
    },
  },
}));

const UkraineText = styled((props) => <Typography variant="h1" {...props} />)(({ theme }) => ({
  fontFamily: 'san serif',
  margin: 0,
  fontWeight: 700,
  fontSize: '64px',
  lineHeight: '64px',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0)',
  WebkitTextStrokeWidth: '2px',
  WebkitTextStrokeColor: 'rgb(41, 24, 194)',

  [theme.breakpoints.up('tablet')]: {
    fontSize: '96px',
    lineHeight: '86px',
    letterSpacing: '15px',
  },

  [theme.breakpoints.up('laptop')]: {
    lineHeight: '117px',
  },
}));

const HeroContainer = styled(Container)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
});

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ position: 'relative' }} component="section">
        <ImageCarousel />

        <HeroContainer>
          <TravelText>
            TRAVEL <span className="heroHeaderHighlighted">around</span>
          </TravelText>

          <UkraineText>ukraine</UkraineText>

          <Button
            sx={{ mt: '60px', textTransform: 'uppercase' }}
            endIcon={<ArrowRightAltIcon />}
            onClick={() => navigate('/catalogue')}
          >
            to our tours
          </Button>
        </HeroContainer>
      </Box>

      <Box component="section" sx={{ mt: '60px' }}>
        <AboutUkraine />
      </Box>

      <Box component="section" sx={{ mt: '80px', mb: '150px' }}>
        <CardContainer />
      </Box>
    </>
  );
};

export default HomePage;
