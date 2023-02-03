import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { styled, alpha, Box, Slider, InputBase, Button } from '@mui/material';
import { FilterAccordion } from '..';
import axiosConfig from '../../../../axiosConfig';
import { setAllToursPrices, setMinPrice, setMaxPrice } from '../../../../store/slices/filterSlice/filterSlice';

const FilterInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 40,
    border: '1px solid',
    borderColor: '#EDEDED',
    width: 85,
    height: 30,
    paddingLeft: 16,
    fontSize: 12,
    boxSizing: 'border-box',

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.15)} 0 0 0 0.12rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ConfirmButton = styled(Button)(() => ({
  fontSize: 12,
  alignSelf: 'center',
  minWidth: 50,
  height: 30,
  padding: 0,

  '&:disabled': {
    background: '#EDEDED',
  },
}));

function valuetext(value) {
  return `${value}`;
}

const CatalogFilterPrice = () => {
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([0, 0]);
  const [minPrice, maxPrice] = prices;
  const allPrices = useSelector((state) => state.filter.allToursPrices, shallowEqual);
  const filterPrices = useSelector((state) => state.filter.prices, shallowEqual);
  const minTourPrice = Math.min.apply(null, allPrices);
  const maxTourPrice = Math.max.apply(null, allPrices);
  const [error, setError] = useState(false);

  const getProductsPrices = async () => {
    try {
      const { data, status } = await axiosConfig(`/products`);
      if (status === 200) {
        // const toursCategories = [...new Set(data.map((tour) => tour.categories))].sort((a, b) => a - b)
        // console.log(toursCategories)
        dispatch(setAllToursPrices([...new Set(data.map((tour) => tour.currentPrice))].sort((a, b) => a - b)));
      }
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  useEffect(() => {
    getProductsPrices();
  }, []);

  useEffect(() => {
    if (allPrices.length > 0) {
      setPrices([minTourPrice, maxTourPrice]);
    }
    if (filterPrices.length > 0) {
      setPrices([filterPrices[0], filterPrices[1]]);
    }
  }, []);

  useEffect(() => {
    setError(() => {
      if (
        minPrice > maxPrice ||
        minPrice < minTourPrice ||
        minPrice > maxTourPrice ||
        maxPrice > maxTourPrice ||
        maxPrice < minTourPrice
      ) {
        return true;
      }
      if (typeof minPrice === 'string') {
        return true;
      }
      return false;
    });
  }, [prices]);

  const handleChange = (event, newValue) => {
    setPrices(newValue);
  };

  const changeMinPrice = (event) => {
    const newValue = Number(event.target.value);
    if (!Number.isNaN(newValue)) {
      setPrices([newValue, maxPrice]);
    } else {
      setPrices([minTourPrice, maxPrice]);
    }
  };

  const changeMaxPrice = (event) => {
    const newValue = Number(event.target.value);
    if (!Number.isNaN(newValue)) {
      setPrices([minPrice, newValue]);
    } else {
      setPrices([minPrice, maxTourPrice]);
    }
  };

  const addPricesFilter = () => {
    dispatch(setMinPrice(minPrice));
    dispatch(setMaxPrice(maxPrice));
  };

  return (
    <FilterAccordion title="Price">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
        <FilterInput
          sx={error && { '& .MuiInputBase-input, & .MuiInputBase-input:focus': { borderColor: 'rgb(254,0,0,0.5)' } }}
          placeholder={String(minTourPrice)}
          value={minPrice}
          onChange={changeMinPrice}
        />
        <span style={{ color: '#c6c6c6', fontSize: '20px' }}>-</span>
        <FilterInput
          sx={error && { '& .MuiInputBase-input, & .MuiInputBase-input:focus': { borderColor: 'rgb(254,0,0,0.5)' } }}
          placeholder={String(maxTourPrice)}
          value={maxPrice}
          onChange={changeMaxPrice}
        />
        <ConfirmButton disabled={error} onClick={addPricesFilter}>
          OK
        </ConfirmButton>
      </Box>

      <Box sx={{ m: '0 auto', pt: '20px' }}>
        <Slider
          min={minTourPrice}
          max={maxTourPrice}
          getAriaLabel={() => 'Price range'}
          value={prices}
          onChange={handleChange}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
    </FilterAccordion>
  );
};

export default memo(CatalogFilterPrice);
