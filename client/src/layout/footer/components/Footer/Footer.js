import React, { memo } from 'react';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Typography, Link as MUILink, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const navigationMenu = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Catalogue',
    path: '/catalogue',
  },
  {
    name: 'Cart',
    path: '/user-cart',
  },
];

const footerGallery = [
  {
    imagePath: '/assets/images/footer/CARPATHIANS.jpg',
    altDescription: 'recent_trips_image',
    id: 1,
  },
  {
    imagePath: '/assets/images/footer/CHERNIVTSI.jpg',
    altDescription: 'recent_trips_image',
    id: 2,
  },
  {
    imagePath: '/assets/images/footer/IVANOFRANKIVSK.jpg',
    altDescription: 'recent_trips_image',
    id: 3,
  },
  {
    imagePath: '/assets/images/footer/KYIV.jpg',
    altDescription: 'recent_trips_image',
    id: 4,
  },
  {
    imagePath: '/assets/images/footer/KYIVCENTER.jpg',
    altDescription: 'recent_trips_image',
    id: 5,
  },
  {
    imagePath: '/assets/images/footer/PRYKARPATTIA.png',
    altDescription: 'recent_trips_image',
    id: 6,
  },
];
const FooterContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.text.primary,
  paddingBottom: '10px',
}));

const FooterWrapper = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  padding: '30px',
  maxWidth: '1200px',
  [theme.breakpoints.up('tablet')]: {
    '& > div': {
      display: 'flex',
      gap: '30px',
    },
  },
}));

const OurAwards = styled(Box)(({ theme }) => ({
  '& > h3': {
    paddingBottom: '30px',
    color: theme.palette.primary.contrastText,
  },
  '& > p': {
    paddingBottom: '30px',
    color: theme.palette.primary.contrastText,
  },
}));

const ContactsInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '10px',
  paddingTop: '30px',
  '& > div': {
    display: 'flex',
    '& > a': {
      textDecoration: 'none',
      color: 'inherit',
      marginLeft: '10px',
    },
    '& > p': {
      marginLeft: '10px',
      marginBottom: '20px',
      color: theme.palette.primary.contrastText,
    },
  },
}));

const SocialIcons = styled('div')({
  display: 'flex',
  justifyContent: 'left',
  gap: '15px',
  paddingTop: '20px',
  paddingBottom: '40px',
  '& > div': {
    '& > svg': {
      width: '40px',
      height: '40px',
      cursor: 'pointer',
    },
  },
});

const RecentTrips = styled(Box)(({ theme }) => ({
  display: 'grid',
  columnGap: '5px',
  gap: '10px',
  gridTemplateColumns: 'repeat(3, 1fr)',
  marginBottom: '30px',
  paddingTop: '30px',
  '& > a >  img': {
    width: '100%',
    borderRadius: '5px',
  },
  [theme.breakpoints.up('tablet')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('laptop')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const FooterNavigation = styled(Box)(({ theme }) => ({
  borderTop: '1px solid  #fff',
  margin: '0 auto',
  padding: '30px',
  maxWidth: '1200px',
  [theme.breakpoints.up('tablet')]: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *': { display: 'flex', gap: '30px' },
  },
}));

const NavigationList = styled('ul')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  gap: '20px',
  padding: '0',
  paddingBottom: '20px',
  '& > li': {
    listStyleType: 'none',
    ' & > a': {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText,
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
  },
  [theme.breakpoints.up('tablet')]: {
    paddingBottom: '0',
  },
}));

const Footer = () => (
  <FooterContainer>
    <FooterWrapper>
      <Box>
        <OurAwards>
          <Typography variant="h3">Our Awards</Typography>
          <Typography>
            Ukraine is a country of brave people and countless opportunities. Here you will be accepted as a relative,
            surrounded by care as at home and get everything done as one would do it for themselves
          </Typography>
          <Box
            sx={{ width: '250px', marginTop: '30px', paddingBottom: '40px' }}
            component="img"
            src="/assets/images/footer/awards.png"
            alt="awards_mage"
          />
        </OurAwards>
        <Box>
          <Typography variant="h3" sx={{ color: 'primary.contrastText' }}>
            Contact info
          </Typography>
          <ContactsInfo>
            <Box>
              <SmartphoneOutlinedIcon sx={{ color: 'primary.contrastText' }} />
              <MUILink href="tel:+380661482997">+38 (066) 148 29 97</MUILink>
            </Box>
            <Box>
              <LocationOnOutlinedIcon sx={{ color: 'primary.contrastText' }} />
              <MUILink
                rel="noreferrer"
                target="_blank"
                href="https://www.google.com.ua/maps/place/%D0%9C%D0%B0%D1%80%D0%B8%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86/@50.4438071,30.544801,15.25z/data=!4m5!3m4!1s0x40d4cfad45d00d9d:0xed19f61774e5a260!8m2!3d50.4483553!4d30.5376094?hl=ru"
              >
                Mariinsky palace, Kyiv, Ukraine
              </MUILink>
            </Box>
            <Box>
              <TimerOutlinedIcon />
              <Typography>Mon - Sat 8.00 - 18.00 Sunday CLOSED</Typography>
            </Box>
            <SocialIcons>
              <Box>
                <FacebookRoundedIcon />
              </Box>
              <Box>
                <TwitterIcon />
              </Box>
              <Box>
                <YouTubeIcon />
              </Box>
              <Box>
                <PinterestIcon />
              </Box>
              <Box>
                <InstagramIcon />
              </Box>
            </SocialIcons>
          </ContactsInfo>
        </Box>
        <Box>
          <Typography sx={{ color: 'primary.contrastText' }} variant="h3">
            Recent Trips
          </Typography>
          <RecentTrips>
            {footerGallery.map((el) => (
              <Link key={el.id} to="/catalogue">
                <Box component="img" src={el.imagePath} alt={el.altDescription} />
              </Link>
            ))}
          </RecentTrips>
        </Box>
      </Box>
    </FooterWrapper>
    <FooterNavigation>
      <Box>
        <Box component="nav">
          <NavigationList>
            {navigationMenu.map((el) => (
              <li key={el.name}>
                <Link to={el.path}>{el.name}</Link>
              </li>
            ))}
          </NavigationList>
        </Box>
      </Box>
      <Typography sx={{ color: 'primary.contrastText' }}>© Copyright travel around ukraine project team</Typography>
    </FooterNavigation>
  </FooterContainer>
);

export default memo(Footer);
