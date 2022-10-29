import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  styled,
  alpha,
  Button,
  useMediaQuery,
  Dialog,
  Slide,
  Link,
} from '@mui/material';
// Icons
import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';

import { TourAccordion, TourReasonToChoose, TourInfoDialog } from '../../components';

const sections = [
  { title: 'About us', link: '#about-tour' },
  { title: 'Reasons to choose', link: '#reasons-to-choose' },
  { title: 'What is included?', link: '#included' },
];

const currency = {
  eur: '€',
  usd: '$',
  uah: '₴',
};

const included = [
  { icon: <PersonIcon color="primary" />, service: 'Professional guide' },
  { icon: <BedIcon color="primary" />, service: 'Accomodation' },
];

const cost = {
  eur: 70,
  usd: 70,
  uah: 2584,
};

const dates = { beginDate: new Date('2022-02-01'), endDate: new Date('2022-02-25') };

const details = {
  duration: '3 days',
  departs: 'First city',
  returns: 'Second city',
};

const Nav = styled('nav')({
  paddingBlock: '20px',
});

// eslint-disable-next-line react/jsx-props-no-spreading
const LinksWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',

  [theme.breakpoints.up('tablet')]: {
    justifyContent: 'center',
  },
}));

const ContentWrapper = styled(Stack)({
  flexDirection: 'row',
  gap: '20px',
});

const Section = styled(Box)({
  scrollMarginTop: '20px',
});

const MobileDialogWrapper = styled(Box)(({ theme }) => ({
  paddingBlock: '10px',
  borderBlock: `1px solid ${theme.palette.divider}`,
}));

const Cost = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 0,
  fontSize: 25,
  lineHeight: 1,
  color: theme.palette.primary.main,
}));

const FloatingDialog = styled(Box)(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  left: 0,
  bottom: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#fff',
  paddingBlock: '15px',
  zIndex: '1',
}));

// TODO: finish section links

const TourPage = () => {
  const matchesMediaQuery = useMediaQuery('(min-width: 1051px)');

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  const dialogRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const intersectionCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const options = { root: null, rootMargin: '0px', threshold: 0.1 };

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, options);
    if (dialogRef.current) observer.observe(dialogRef.current);

    return () => {
      if (dialogRef.current) observer.unobserve(dialogRef.current);
    };
  }, [dialogRef, options]);

  return (
    <Box>
      <Container>
        <Nav>
          <LinksWrapper>
            {sections.map(({ title, link }) => (
              <Link key={title} href={link} variant="body1" underline="none" color="inherit">
                {title}
              </Link>
            ))}
          </LinksWrapper>
        </Nav>
        <ContentWrapper>
          {matchesMediaQuery ? (
            <Box component="aside" sx={{ maxWidth: '370px', width: '100%' }}>
              <TourInfoDialog included={included} cost={cost} dates={dates} details={details} />
            </Box>
          ) : null}
          <Box sx={{ flex: 1 }}>
            <Section id="about-tour">
              <Typography variant="h2">About tour</Typography>
              <Box sx={{ paddingBottom: 3 }}>
                <Typography>
                  Each medieval city is full of various legends and mystical stories. Lviv is no exception because more
                  than 760 years of history simply could not help but leave mysterious legends.
                </Typography>
                <Typography>
                  The guide will tell and show that Lviv legends can impress no less than Lviv architecture. This tour
                  will be filled with incredible stories - unusual stories from the life of the Galician capital.
                </Typography>
                <Typography>
                  How can one explain the black colour of one of the houses on Rynok Square? How did Adam Senyavsky
                  marry his daughter? How did the first bulletin board appear in Lviv? Why did one Lviv lady make a not
                  entirely decent offer to the tram? Are the legends about Lviv ghosts true? What do Lviv courtyards
                  hide?
                </Typography>
                <Typography>All this and more you can learn during this tour.</Typography>
                <Typography>Looks like today. The program of individual excursions: at any hour.</Typography>
              </Box>
            </Section>
            <Section id="reasons-to-choose">
              <TourAccordion id="reasons-to-choose" title="Reasons to choose our tour">
                <Stack direction="row" gap={3} flexWrap="wrap" mt={2} pl={2}>
                  <TourReasonToChoose
                    number={1}
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi ducimus tenetur in aspernatur, asperiores."
                  />
                  <TourReasonToChoose
                    number={2}
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
                  />
                  <TourReasonToChoose
                    number={3}
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi ducimus tenetur in aspernatur, asperiores."
                  />
                </Stack>
              </TourAccordion>
            </Section>
            <Section id="included">
              <TourAccordion title="What is included?">
                <Stack direction="row" gap="20px">
                  {included.map(({ icon, service }) => (
                    <Stack key={service} direction="row" gap="5px" alignItems="center" flexWrap="wrap">
                      {icon}
                      <Typography gutterBottom={false}>{service}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </TourAccordion>
            </Section>
          </Box>
        </ContentWrapper>

        {!matchesMediaQuery ? (
          <MobileDialogWrapper ref={dialogRef}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Cost>
                {currency.eur}
                {cost.eur}
              </Cost>
              <Button variant="contained" sx={{ paddingInline: '30px' }} disableElevation onClick={handleOpenDialog}>
                More info
              </Button>
            </Stack>
            <Dialog open={isOpen} onClose={handleCloseDialog} hideBackdrop fullScreen>
              <TourInfoDialog
                included={included}
                cost={cost}
                dates={dates}
                details={details}
                closeButton
                handleClose={handleCloseDialog}
              />
            </Dialog>
          </MobileDialogWrapper>
        ) : null}
      </Container>

      {!matchesMediaQuery ? (
        <Slide in={!isVisible} direction="up" mountOnEnter unmountOnExit>
          <FloatingDialog>
            <Container>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Cost>
                  {currency.eur}
                  {cost.eur}
                </Cost>
                <Button variant="contained" sx={{ paddingInline: '30px' }} disableElevation onClick={handleOpenDialog}>
                  More info
                </Button>
              </Stack>
            </Container>
          </FloatingDialog>
        </Slide>
      ) : null}
    </Box>
  );
};

export default TourPage;
