/* eslint-disable react/prop-types */
import React,{memo} from 'react';
import { Grid, Typography, FormLabel, Radio, FormControlLabel, styled } from '@mui/material';
import { TextField, RadioGroup } from 'formik-mui';
import { DatePicker } from 'formik-mui-x-date-pickers';
import { Field } from 'formik';
import { formModel } from '../../data';

const PaymentForm = () => {
  const { cardType, nameOnCard, cardNumber, expiryDate, cvv } = formModel;

  const RadioGrouping = styled(RadioGroup)({
    justifyContent: 'space-evenly',
  });

  return (
    <>
      <Typography variant="h3" align="center" sx={{ mb: '20px' }}>
        Payment Details
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} laptop={6}>
          <FormLabel id={cardType.name}>{cardType.label}</FormLabel>
          <Field component={RadioGrouping} aria-labelledby={cardType.name} row name={cardType.name}>
            <FormControlLabel
              componentsProps={{ typography: { gutterBottom: false } }}
              value="visa"
              control={<Radio />}
              label={<img src="./assets/images/checkoutPageForm/visa.png" alt="visa" />}
            />
            <FormControlLabel
              componentsProps={{ typography: { gutterBottom: false } }}
              value="mastercard"
              control={<Radio />}
              label={<img src="./assets/images/checkoutPageForm/mastercard.png" alt="mastercard" />}
            />
            <FormControlLabel
              componentsProps={{ typography: { gutterBottom: false } }}
              value="americanExpress"
              control={<Radio />}
              label={<img src="./assets/images/checkoutPageForm/americanExpress.png" alt="americanExpress" />}
            />
            <FormControlLabel
              componentsProps={{ typography: { gutterBottom: false } }}
              value="paypal"
              control={<Radio />}
              label={<img src="./assets/images/checkoutPageForm/paypal.png" alt="paypal" />}
            />
          </Field>
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={cardNumber.name} label={cardNumber.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={nameOnCard.name} label={nameOnCard.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={3}>
          <Field component={DatePicker} disablePast required name={expiryDate.name} label={expiryDate.label} />
        </Grid>

        <Grid item xs={12} laptop={3}>
          <Field component={TextField} required name={cvv.name} label={cvv.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(PaymentForm);
