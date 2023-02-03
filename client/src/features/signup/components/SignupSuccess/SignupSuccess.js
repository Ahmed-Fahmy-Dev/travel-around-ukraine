/* eslint-disable react/prop-types */
import React,{memo} from 'react';
import { Typography, Box } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useNavigate } from 'react-router-dom';
import { AlertModal } from '../../../../components';

const SignupSuccess = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleCloseBttn = () => {
    onClose();
    navigate('/catalogue');
  };

  const titleJsx = (
    <Box display="flex" justifyContent="center" alignItems="center" columnGap="5px">
      <Typography variant="h2" sx={{ color: 'success.main', mb: 0 }}>
        Sign up Successfull
      </Typography>
      <CheckCircleOutlineRoundedIcon fontSize="large" color="success" />
    </Box>
  );

  return (
    <AlertModal
      open={open}
      onClose={handleCloseBttn}
      onSubmit={handleCloseBttn}
      title={titleJsx}
      disableCancelButton
      submitButtonText="Great !"
      success
    >
      <Typography>You can enjoy your shopping with us now.</Typography>
    </AlertModal>
  );
};

export default memo(SignupSuccess);
