import React, { useState, memo } from 'react';
import { Button, styled, Typography } from '@mui/material';
import { TextField } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { AlertModal } from '../../../../components';
import subscribeUser from '../../../../api/subscribeUser';

const TextFieldContactsPersonData = styled(Field)(({ theme }) => ({
  width: '270px',

  [theme.breakpoints.up('tablet')]: {
    width: '280px',
  },
  [theme.breakpoints.up('laptop')]: {
    width: '300px',
  },
}));

const ContactsForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalSuccess, setModalSuccess] = useState('true');

  const closeModal = () => setIsModalOpen(false);

  const initialValues = {
    email: '',
  };

  const schema = yup.object().shape({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  });

  const handleSubmit = async (values) => {
    const { isSuccess, error } = await subscribeUser(values);
    if (isSuccess) {
      setIsModalOpen(true);
      setModalTitle('Subscription Successful');
      setModalText('You can enjoy our Newsletter service now on your mail');
      setModalSuccess('true');
    } else {
      setIsModalOpen(true);
      setModalTitle('Subscription failed');
      setModalText(error.message);
      setModalSuccess('false');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <TextFieldContactsPersonData component={TextField} name="email" label="Email" margin="normal" />

          <Button margin="normal" sx={{ display: 'block', marginTop: '15px' }} type="submit">
            Subscribe
          </Button>

          <AlertModal
            open={isModalOpen}
            onClose={closeModal}
            onSubmit={closeModal}
            title={modalTitle}
            disableCancelButton
            submitButtonText="Close"
            success={modalSuccess}
          >
            <Typography>{modalText}</Typography>
          </AlertModal>
        </Form>
      )}
    </Formik>
  );
};

export default memo(ContactsForm);
