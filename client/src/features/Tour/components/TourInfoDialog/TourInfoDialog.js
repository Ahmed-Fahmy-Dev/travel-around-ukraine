/* eslint-disable react/forbid-prop-types */
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

// MUI
import { Box as MuiBox, Button, IconButton, Stack, Typography, styled } from '@mui/material';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CloseIcon from '@mui/icons-material/Close';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, addProductToLocal } from '../../../../store/slices/cartSlice/cartSlice';
import getProduct from '../../../../api/getProduct';

// Utils & Data
import formatTourDate from '../../utils/formatTourDate';
import currencyConverter from '../../utils/currencyConverter';
import convertData from '../../utils/convertData';
import currencySymbols from '../../../data/currencySymbols';

// Components
import { BoxWrapper, Section, Title, Select, MenuItem } from '../../../../components';

const IncludedContentWrapper = styled(MuiBox)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '7px',
});

const Cost = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 0,
  fontSize: 35,
  lineHeight: 1,
  color: theme.palette.primary.main,
}));

const TourInfoDialog = ({
  dates,
  professionalGuide,
  accommodation,
  meals,
  transferAlongTheRoute,
  travelInsurance,
  departs,
  duration,
  returns,
  currentPrice,
  id,
  itemNo,
  closeButton,
  handleClose,
}) => {
  const [currency, setCurrency] = useState('eur');
  const included = convertData(professionalGuide, accommodation, meals, transferAlongTheRoute, travelInsurance);
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);

  const addBttnHandler = async () => {
    if (isLogin) {
      dispatch(addProduct(id));
    } else {
      // getProduct API function will be moved later to seperate folder within our store for refactoring purpose.
      const product = await getProduct(itemNo);
      dispatch(addProductToLocal(product));
    }
  };

  return (
    <BoxWrapper>
      {closeButton && (
        <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      )}
      <Section>
        <Title>Included</Title>

        <IncludedContentWrapper>
          {included.map(({ icon, service }) => (
            <Stack key={service} direction="row" gap="5px" alignItems="center">
              {icon}
              <Typography gutterBottom={false}>{service}</Typography>
            </Stack>
          ))}
        </IncludedContentWrapper>
      </Section>
      <Section>
        <Title>Dates</Title>
        <Stack direction="row" gap="5px" alignItems="center">
          <CalendarMonthIcon color="primary" />
          <Typography gutterBottom={false}>
            {formatTourDate(dates.beginDate)} - {formatTourDate(dates.endDate)}
          </Typography>
        </Stack>
      </Section>
      <Section>
        <Title>Details</Title>
        <Stack gap="5px">
          <Stack direction="row" alignItems="center" gap="5px">
            <AccessTimeIcon color="primary" />
            <Typography gutterBottom={false}>Duration</Typography>
            <Typography marginLeft="auto">{duration}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="5px">
            <FlightTakeoffIcon color="primary" />
            <Typography gutterBottom={false}>Departs</Typography>
            <Typography marginLeft="auto">{departs}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="5px">
            <KeyboardReturnIcon color="primary" />
            <Typography gutterBottom={false}>Returns</Typography>
            <Typography marginLeft="auto">{returns}</Typography>
          </Stack>
        </Stack>
      </Section>
      <Section>
        <Title>Currency</Title>
        <Select fullWidth value={currency} onChange={(e) => setCurrency(e.target.value)} IconComponent={ExpandMoreIcon}>
          {Object.keys(currencySymbols).map((key) => (
            <MenuItem key={key} value={key}>
              {key.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </Section>
      <MuiBox>
        <Title>Total</Title>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Cost>
            {currencySymbols[currency]}
            {currencyConverter(currentPrice, currency)}
          </Cost>
          <Button sx={{ paddingInline: '30px' }} disableElevation onClick={addBttnHandler}>
            Add to Cart
          </Button>
        </Stack>
      </MuiBox>
    </BoxWrapper>
  );
};

TourInfoDialog.propTypes = {
  dates: PropTypes.objectOf(PropTypes.instanceOf(Date)).isRequired,
  professionalGuide: PropTypes.bool,
  accommodation: PropTypes.bool,
  meals: PropTypes.bool,
  transferAlongTheRoute: PropTypes.bool,
  travelInsurance: PropTypes.bool,
  duration: PropTypes.string,
  departs: PropTypes.string,
  returns: PropTypes.string,
  currentPrice: PropTypes.number,
  id: PropTypes.string,
  itemNo: PropTypes.string,
  closeButton: PropTypes.bool,
  handleClose: PropTypes.func,
};

TourInfoDialog.defaultProps = {
  closeButton: false,
  handleClose: () => {},
  professionalGuide: false,
  accommodation: false,
  meals: false,
  transferAlongTheRoute: false,
  travelInsurance: false,
  duration: 'Unknown',
  departs: 'Unknown',
  returns: 'Unknown',
  currentPrice: 0,
  id: '',
  itemNo: '',
};

export default memo(TourInfoDialog);
