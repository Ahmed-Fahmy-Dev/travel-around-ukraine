import React from 'react';
import { Container, Typography } from '@mui/material';
import { SignupForm } from '../../features/signup/components';

const SignupPage = () => (
  <Container sx={{ mt: '200px', mb: '300px' }}>
    <Typography variant="h2" align="center" sx={{ mb: '20px' }}>
      Sign Up
    </Typography>
    <SignupForm />
  </Container>
);

export default SignupPage;
