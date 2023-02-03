/* eslint-disable react/prop-types */
import React,{memo} from 'react';
import { Grid, Typography } from '@mui/material';
import { TextField } from 'formik-mui';
import { Field } from 'formik';
import {formModel} from '../../data';

const ShippingAddressForm = () => {
  const { addressOne, addressTwo, city, state, zipcode, country } = formModel;

  return (
    <>
      <Typography variant="h3" align="center" sx={{ mb: '20px' }}>
        Shipping Address
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12}>
          <Field component={TextField} required name={addressOne.name} label={addressOne.label} fullWidth />
        </Grid>

        <Grid item xs={12}>
          <Field component={TextField} name={addressTwo.name} label={addressTwo.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={city.name} label={city.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} name={state.name} label={state.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={zipcode.name} label={zipcode.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={country.name} label={country.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(ShippingAddressForm);
