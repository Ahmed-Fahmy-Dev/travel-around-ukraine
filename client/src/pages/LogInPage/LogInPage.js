import React from 'react';
import { Container, Paper, Typography, Slide } from '@mui/material';
import { grey } from '@mui/material/colors';
import LogInForm from '../../features/LogIn/components/LogInForm';

const paperSX = {
  textAlign: 'center',
  px: { xs: 2 },
  py: { xs: 4 },
  backgroundColor: grey.A100,
  borderRadius: '24px',
  width: { desktop: '70%' },
  m: '0 auto',
};

const LogInPage = () => (
  <Container sx={{ marginTop: { xs: '120px', tablet: '180px' }, height: '60vh' }}>
    <Slide timeout={500} direction="up" in mountOnEnter unmountOnExit>
      <Paper sx={paperSX}>
        <Typography variant="h2">Log In</Typography>
        <LogInForm />
      </Paper>
    </Slide>
  </Container>
);

export default LogInPage;
