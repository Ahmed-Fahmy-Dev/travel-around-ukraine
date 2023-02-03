import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const CheckoutSummary = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h2">Order Summary</Typography>
      <Button onClick={() => navigate('/catalogue')}>Continue Shopping</Button>
    </>
  );
};

export default memo(CheckoutSummary);
