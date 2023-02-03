/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable  react/prop-types */
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, InputBase, ClickAwayListener } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import appliedTheme from '../../../../theme/theme';
import { HeaderFilterItems } from '..';
import { searchProductByString, setIsSearchBarOpen } from '../../../../store/slices/searchBarSlice/searchBarSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  transition: '0.2s',

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    transition: '0.2s',
  },
  width: 'auto',
  marginLeft: '9vw',

  [theme.breakpoints.up('mobile')]: {
    display: 'block',
    marginLeft: '5vw',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    color: appliedTheme.palette.text.primary,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.up('mobile')]: {
      width: '12ch',
      '&:focus': {
        border: '1px solid #FFC700',
        borderRadius: theme.shape.borderRadius,
        width: '20ch',
      },
    },
  },
}));

const HeaderSearchField = () => {
  const isSearchBarOpen = useSelector((store) => store.searchBar.isSearchBarOpen);
  const dispatch = useDispatch();

  const closeSearchBar = () => {
    dispatch(setIsSearchBarOpen(false));
  };

  const handleInputChange = (event) => {
    if (event.target.value.length >= 2) {
      dispatch(setIsSearchBarOpen(true));
      dispatch(searchProductByString(event.target.value));
    } else {
      dispatch(setIsSearchBarOpen(false));
    }
  };

  const handleInputFocus = (event) => {
    if (event.target.value.length >= 2) {
      dispatch(setIsSearchBarOpen(true));
    }
  };

  return (
    <ClickAwayListener onClickAway={closeSearchBar}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: appliedTheme.palette.text.primary }} />
        </SearchIconWrapper>
        <StyledInputBase
          onFocus={handleInputFocus}
          onChange={debounce(handleInputChange, 750)}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        {isSearchBarOpen && <HeaderFilterItems closeSearchBar={closeSearchBar} />}
      </Search>
    </ClickAwayListener>
  );
};

export default memo(HeaderSearchField);
