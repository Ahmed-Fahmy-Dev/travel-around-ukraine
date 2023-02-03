import React, { useEffect, memo } from 'react';
// Formik
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enAU } from 'date-fns/locale';
// MUI Components
import { Stepper, Step, StepLabel } from '@mui/material';
// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchUserInfo } from '../../../../store/slices/userSlice/userSlice';
import {
  increaseStep,
  decreaseStep,
  resetStep,
  createNewOrder,
  setIsModalOpen,
} from '../../../../store/slices/orderSlice/orderSlice';
import { deleteOnlineCart } from '../../../../store/slices/cartSlice/cartSlice';
// Child Forms and model
import { UserDetailsForm, ShippingAddressForm, PaymentForm, PaymentSuccess, CheckoutSummary } from '..';
import FormBttnContainer from '../../../../components/FormBttnContainer/FormBttnContainer';
import { validationSchema } from '../../data';
import setInitialValue from '../../utils/setInitialValue';

const steps = ['User Details', 'Shipping Address', 'Payment Details'];

const CheckoutForm = () => {
  const { currentStep, isLoading } = useSelector((state) => state.order, shallowEqual);
  const isLogin = useSelector((store) => store.user.isLogin);
  const userData = useSelector((store) => store.user.userData);

  const dispatch = useDispatch();

  const lastStep = steps.length - 1;
  const currentValidationSchema = validationSchema[currentStep];

  const goToNextStep = () => {
    dispatch(increaseStep());
  };

  const goToPrevStep = () => {
    dispatch(decreaseStep());
  };

  const formSubmitHandler = async (values) => {
    if (currentStep !== lastStep) {
      goToNextStep();
      return;
    }

    try {
      await dispatch(createNewOrder(values)).unwrap();

      await dispatch(deleteOnlineCart()).unwrap();

      dispatch(setIsModalOpen(true));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchUserInfo());
    }
  }, []);

  useEffect(() => () => dispatch(resetStep()), []);

  return (
    <>
      <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: '100px' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStep === steps.length ? (
        <CheckoutSummary />
      ) : (
        <Formik
          initialValues={setInitialValue(isLogin, userData)}
          validationSchema={currentValidationSchema}
          onSubmit={formSubmitHandler}
        >
          {({ isSubmitting }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
              <Form>
                {currentStep === 0 && <UserDetailsForm />}

                {currentStep === 1 && <ShippingAddressForm />}

                {currentStep === 2 && <PaymentForm />}

                <FormBttnContainer
                  currentStep={currentStep}
                  lastStep={lastStep}
                  isLoading={isLoading}
                  isSubmitting={isSubmitting}
                  goToPrevStep={goToPrevStep}
                  bttnText="Continue"
                  bttnLastStepText="Confirm"
                />
              </Form>
            </LocalizationProvider>
          )}
        </Formik>
      )}

      <PaymentSuccess />
    </>
  );
};

export default memo(CheckoutForm);
