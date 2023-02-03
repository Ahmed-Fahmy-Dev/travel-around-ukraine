import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const ErrorWrapper = styled('div')({
  marginTop: '90px',
  marginBottom: '150px',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  '& > div': {
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      width: '50vw',
      maxWidth: '500px',
    },
  },
});

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ErrorWrapper>
        <Box>
          <Box src="/assets/images/404/heart.png" component="img" alt="uk-flag" />
        </Box>
        <Typography sx={{ mb: '40px' }} variant="h2">
          404 page not found
        </Typography>
        <Typography>Please, navigate to main page to plan your trip</Typography>
        <Box sx={{ mt: '40px'}}>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Box>
      </ErrorWrapper>
    </Container>
  );
};

export default ErrorPage;
