import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, CircularProgress } from '@mui/material';

const FormBttnContainer = ({
  currentStep,
  lastStep,
  isLoading,
  isSubmitting,
  goToPrevStep,
  bttnText,
  bttnLastStepText,
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: 3, position: 'relative' }}>
    {currentStep !== 0 && !isSubmitting && <Button onClick={goToPrevStep}>Back</Button>}

    {isLoading ? (
      <CircularProgress
        size={50}
        sx={{
          color: 'primary.dark',
        }}
      />
    ) : (
      <Button disabled={isSubmitting} type="submit">
        {currentStep !== lastStep ? bttnText : bttnLastStepText}
      </Button>
    )}
  </Box>
);

FormBttnContainer.propTypes = {
  currentStep: PropTypes.number.isRequired,
  lastStep: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  isSubmitting: PropTypes.bool.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  bttnText: PropTypes.string.isRequired,
  bttnLastStepText: PropTypes.string.isRequired,
};

FormBttnContainer.defaultProps = {
  isLoading: false,
};

export default FormBttnContainer;
