/* eslint-disable react/prop-types */
import React,{memo} from 'react';
import { Typography, Box } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalOpen, increaseStep } from '../../../../store/slices/orderSlice/orderSlice';
import { AlertModal } from '../../../../components';

const PaymentSuccess = () => {
  const { isModalOpen, orderInfo } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  const handleCloseBttn = () => {
    dispatch(setIsModalOpen(false));
    dispatch(increaseStep());
  };

  const titleJsx = (
    <Box display="flex" justifyContent="center" alignItems="center" columnGap="5px">
      <Typography variant="h2" sx={{ color: 'success.main', mb: 0 }}>
        Payment Successfull
      </Typography>
      <CheckCircleOutlineRoundedIcon fontSize="large" color="success" />
    </Box>
  );

  return (
    <AlertModal
      open={isModalOpen}
      onClose={handleCloseBttn}
      onSubmit={handleCloseBttn}
      title={titleJsx}
      disableCancelButton
      submitButtonText="Great !"
      success
    >
      Your order number #{orderInfo?.orderNo} will be shipped shortly.
    </AlertModal>
  );
};

export default memo(PaymentSuccess);
