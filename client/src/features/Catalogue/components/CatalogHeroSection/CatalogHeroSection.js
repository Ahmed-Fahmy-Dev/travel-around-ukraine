import React, { memo } from 'react';
import { styled, Box, Container, Typography } from '@mui/material';

const MainSectionWrapper = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${'./assets/images/cataloguePage/catalogMainSectionBG.jpg'})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundColor: theme.palette.primary.main,
  height: 370,
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.up('tablet')]: {
    height: 510,
  },

  [theme.breakpoints.up('laptop')]: {
    height: 289,
  },
}));

const MainSectionText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontsize: 36,
  marginBottom: 0,
  color: theme.palette.primary.contrastText,
  textTransform: 'uppercase',

  [theme.breakpoints.up('tablet')]: {
    fontsize: 44,
  },

  [theme.breakpoints.up('laptop')]: {
    fontsize: 72,
  },
}));

const CatalogHeroSection = () => (
  <MainSectionWrapper>
    <Container>
      <MainSectionText variant="h1">our tours</MainSectionText>
    </Container>
  </MainSectionWrapper>
);

export default memo(CatalogHeroSection);
