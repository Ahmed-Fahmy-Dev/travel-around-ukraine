import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// MUI
import { Button, Stack, Box as MuiBox, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BoxWrapper, Section, Title, Select, MenuItem } from '../../../../components';

// Utils & Data
import calcToursQuantityAndPrice from '../../utils/calcToursQuantityAndPrice';
import currencyConverter from '../../../Tour/utils/currencyConverter';
import currencySymbols from '../../../data/currencySymbols';

const TotalInfoDialog = ({ cart }) => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('eur');
  let toursPriceAndQuantity;

  if (cart.length) {
    toursPriceAndQuantity = calcToursQuantityAndPrice(cart);
  }

  const onCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <BoxWrapper>
      <Section>
        <Title>Total</Title>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tours amount:</Typography>
          <Typography>{toursPriceAndQuantity?.toursQuantity}</Typography>
        </Stack>
      </Section>

      <Section>
        <Title>Currency</Title>
        <Select fullWidth value={currency} onChange={onCurrencyChange} IconComponent={ExpandMoreIcon}>
          {Object.keys(currencySymbols).map((key) => (
            <MenuItem key={key} value={key}>
              {key.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </Section>

      <Section>
        <Stack direction="row" justifyContent="space-between">
          <Typography>To be paid:</Typography>
          <Typography fontSize={18}>
            {currencySymbols[currency]}
            {currencyConverter(toursPriceAndQuantity?.toursPrice, currency)}
          </Typography>
        </Stack>
      </Section>

      <MuiBox>
        <Stack direction="row" justifyContent="end" alignItems="center">
          <Button sx={{ paddingInline: '30px' }} disableElevation onClick={() => navigate('/checkout')}>
            Checkout
          </Button>
        </Stack>
      </MuiBox>
    </BoxWrapper>
  );
};

TotalInfoDialog.propTypes = {
  cart: PropTypes.array,
};

TotalInfoDialog.defaultProps = {
  cart: [],
};

export default memo(TotalInfoDialog);
