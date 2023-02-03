import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled, alpha, ToggleButton } from '@mui/material';
import { setCategories } from '../../../../store/slices/filterSlice/filterSlice';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 40,
  border: '1px solid #EDEDED',
  background: 'none',
  fontWeight: 500,
  fontSize: 13,
  textTransform: 'none',
  padding: theme.spacing(0.5),
  textAlign: 'center',
  width: '100%',
  color: theme.palette.text.primary,

  '&:hover': {
    boxShadow: `${alpha(theme.palette.primary.main, 0.15)} 0 0 0 0.12rem`,
    borderColor: theme.palette.primary.main,
    backgroundColor: `${alpha(theme.palette.primary.main, 0.05)}`,
  },

  '&.Mui-selected': {
    backgroundColor: `${alpha(theme.palette.primary.main, 0.85)}`,
    color: theme.palette.primary.contrastText,

    '&:hover': {
      backgroundColor: `${alpha(theme.palette.primary.main, 0.85)}`,
    },
  },
}));

const OutlinedToggleButton = ({ value, children }) => {
  const dispatch = useDispatch();
  const filterCategories = useSelector((store) => store.filter.categories);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(filterCategories.includes(value.toLowerCase()));
  }, [filterCategories]);

  const setfilterCategory = (category) => {
    setSelected((prev) => !prev);
    dispatch(setCategories(category));
  };

  return (
    <StyledToggleButton value={value} selected={selected} onChange={() => setfilterCategory(value.toLowerCase())}>
      {children}
    </StyledToggleButton>
  );
};

OutlinedToggleButton.propTypes = {
  children: PropTypes.any,
  value: PropTypes.string,
};

OutlinedToggleButton.defaultProps = {
  children: '',
  value: '',
};

export default memo(OutlinedToggleButton);
