import React from 'react';
import { Container, Typography } from '@mui/material';
import { CheckoutForm } from '../../features/checkout/components';

const CheckoutPage = () => (
  <Container sx={{ mt: '150px', mb: '150px' }}>
    <Typography variant="h2" align="center" sx={{ mb: '20px' }}>
      Checkout
    </Typography>
    <CheckoutForm />
  </Container>
);

export default CheckoutPage;
