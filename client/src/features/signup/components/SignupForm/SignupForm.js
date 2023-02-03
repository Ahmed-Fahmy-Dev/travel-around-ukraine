import React, { useState,memo } from 'react';
// Formik
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enAU } from 'date-fns/locale';
// MUI Components
import { Stepper, StepLabel, Step } from '@mui/material';

import postSignUpData from '../../../../api/postSignUpData';

// Child Forms and model
import { initialValues, validationSchema } from '../../data';
import { UserInfoForm, LoginInfoForm, SignupSuccess } from '..';
import FormBttnContainer from '../../../../components/FormBttnContainer/FormBttnContainer';

const steps = ['User Info', 'Login Info'];

const SignupForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentValidationSchema = validationSchema[activeStep];
  const lastStep = steps.length - 1;

  const handleCloseModal = () => setIsModalOpen(false);

  const nextStep = () => {
    setActiveStep((prev) => (prev >= lastStep ? prev : prev + 1));
  };

  const goToPrevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const formSubmitHandler = async (values) => {
    nextStep();

    if (activeStep === lastStep) {
      const { isSuccess, error } = await postSignUpData(values);
      if (isSuccess) {
        setIsModalOpen(true);
      } else {
        // TODO: render error alert
        // eslint-disable-next-line no-console
        console.error(error); // ! for demonstration purpose
      }
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik initialValues={initialValues} validationSchema={currentValidationSchema} onSubmit={formSubmitHandler}>
        {({ isSubmitting }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
            <Form>
              {activeStep === 0 && <UserInfoForm />}

              {activeStep === 1 && <LoginInfoForm />}

              <FormBttnContainer
                currentStep={activeStep}
                lastStep={lastStep}
                isSubmitting={isSubmitting}
                goToPrevStep={goToPrevStep}
                bttnText="Continue"
                bttnLastStepText="Sign up"
              />
            </Form>
          </LocalizationProvider>
        )}
      </Formik>

      <SignupSuccess open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default memo(SignupForm);
