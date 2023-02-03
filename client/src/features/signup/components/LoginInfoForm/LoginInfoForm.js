import React, { memo } from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import { Grid, Typography } from '@mui/material';
import { formModel } from '../../data';

const LoginInfoForm = () => {
  const { email, login, password, retypePassword } = formModel;

  return (
    <>
      <Typography variant="h3" mb={3}>
        Login Info
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} laptop={6}>
          <Field component={TextField} name={email.name} label={email.label} fullWidth required />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} name={login.name} label={login.label} fullWidth required />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field component={TextField} name={password.name} label={password.label} type="password" fullWidth required />
        </Grid>

        <Grid item xs={12} laptop={6}>
          <Field
            component={TextField}
            name={retypePassword.name}
            label={retypePassword.label}
            type="password"
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(LoginInfoForm);
