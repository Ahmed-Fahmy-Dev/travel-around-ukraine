/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField } from 'formik-mui';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import postLogIn from '../../../api/postLogIn';
import { setIsLogin } from '../../../store/slices/userSlice/userSlice';
import { migrateCart, fetchCart } from '../../../store/slices/cartSlice/cartSlice';

const buttonSX = {
  width: { xs: '86px', mobile: '110px', tablet: '140px', laptop: '150px' },
  px: 0,
  py: { xs: '8px', mobile: '12px', desktop: '14px' },
  mx: 4,
  fontSize: { xs: '12px', laptop: '14px' },
};

const preloaderSX = {
  my: 5,
  width: '80px !important',
  height: '80pX !important',
};

const gridItemSx = {
  width: { xs: '80%', tablet: '60%', laptop: '40%' },
  my: { xs: '4%', tablet: '3%' },
};

const LogInForm = () => {
  const [errorMassage, setErrorMassage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((store) => store.cart.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myHandleSubmit = async (values) => {
    setIsLoading(true);

    const response = await postLogIn(values).then((res) => res);

    if (response.success) {
      localStorage.setItem('token', response.token);
      setErrorMassage(null);
      navigate('/');
      dispatch(setIsLogin(true));

      dispatch(fetchCart())
        .unwrap()
        .then(() => {
          const localCart = JSON.parse(localStorage.getItem('cart'));
          localCart && dispatch(migrateCart(localCart));
        });
    } else {
      setErrorMassage(response?.password || response?.loginOrEmail);
    }

    setIsLoading(false);
  };

  const handleClickSignUp = () => {
    navigate('/signup');
  };

  const initialValues = {
    loginOrEmail: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    loginOrEmail: yup.string().required('Email or login are required'),
    password: yup.string().min(7, 'Password must have at least 7 characters').required('Password is required!'),
  });

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={preloaderSX} />
      ) : (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={myHandleSubmit}>
          {() => (
            <Form>
              <Grid container direction="column" alignItems="center">
                <Grid item sx={gridItemSx}>
                  <Field component={TextField} name="loginOrEmail" label="Email" fullWidth />
                </Grid>
                <Grid sx={gridItemSx}>
                  <Field component={TextField} type="password" name="password" label="Password" fullWidth />
                </Grid>
              </Grid>
              {errorMassage && (
                <Typography sx={{ color: '#d32f2f', textAlign: 'center' }}>Password or login is not correct</Typography>
              )}
              <Box sx={{ my: { xs: 1.5, laptop: 2.5 } }}>
                <Button sx={buttonSX} onClick={handleClickSignUp}>
                  sign up
                </Button>
                <Button type="submit" sx={buttonSX}>
                  log in
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
      {}
    </>
  );
};
export default LogInForm;
