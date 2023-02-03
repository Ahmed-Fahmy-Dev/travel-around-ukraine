import React, { memo } from 'react';
import { Grid, Typography } from '@mui/material';
import { TextField } from 'formik-mui';
import { Field } from 'formik';
import { formModel } from '../../data';

const UserDetailsForm = () => {
  const { firstName, lastName, email, phone } = formModel;

  return (
    <>
      <Typography variant="h3" align="center" sx={{ mb: '20px' }}>
        User Details
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={firstName.name} label={firstName.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={lastName.name} label={lastName.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={email.name} label={email.label} fullWidth />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} required name={phone.name} label={phone.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
};
export default memo(UserDetailsForm);
