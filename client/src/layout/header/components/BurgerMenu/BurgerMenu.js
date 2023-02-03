import React, { useState } from 'react';
import { Box, MenuItem, Menu, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setIsModalOpen } from '../../../../store/slices/userSlice/userSlice';

const loggedPages = [
  {
    name: 'home',
    link: '/',
    innerContent: 'Home',
  },
  {
    name: 'catalogue',
    link: '/catalogue',
    innerContent: 'Catalogue',
  },
  {
    name: 'account',
    link: '/user',
    innerContent: 'Account',
  },
  {
    name: 'cart',
    link: '/user-cart',
    innerContent: 'Cart',
  },
  {
    name: 'favorites',
    link: '/favorites',
    innerContent: 'Favorites',
  },
  {
    name: 'logOut',
    link: null,
    innerContent: 'LogOut',
    onClick: (dispatch) => dispatch(setIsModalOpen(true)),
  },
];

const unloggedPages = [
  {
    name: 'home',
    link: '/',
    innerContent: 'Home',
  },
  {
    name: 'catalogue',
    link: '/catalogue',
    innerContent: 'Catalogue',
  },
  {
    name: 'logIn',
    link: '/login',
    innerContent: 'LogIn',
  },
  {
    name: 'cart',
    link: '/user-cart',
    innerContent: 'Cart',
  },
  {
    name: 'favorites',
    link: '/favorites',
    innerContent: 'Favorites',
  },
];

const boxSX = {
  flexGrow: 1,
  display: { xs: 'flex', laptop: 'none' },
  justifyContent: 'flex-end',
};

const menuSX = {
  display: { xs: 'flex', laptop: 'none' },
};

const menuItemSX = {
  padding: '6px 16px',
  width: '40vw',
  maxWidth: '200px',
  height: '50px',
  color: 'text.primary',
  textDecoration: 'none',
};

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const transformOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const BurgerMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isLogin } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPages = isLogin ? loggedPages : unloggedPages;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={boxSX}>
      <IconButton
        size="large"
        aria-label="appbar"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        sx={{ padding: 0, color: 'text.primary' }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={anchorOrigin}
        keepMounted
        transformOrigin={transformOrigin}
        open={!!anchorElNav}
        onClose={handleCloseNavMenu}
        sx={menuSX}
      >
        {currentPages.map(({ name, link, innerContent, onClick }) => (
          <MenuItem
            component={NavLink}
            key={name}
            onClick={() => {
              if (onClick) {
                onClick(dispatch, navigate);
              }
              handleCloseNavMenu();
            }}
            to={link}
            sx={menuItemSX}
            end
          >
            {innerContent}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default BurgerMenu;
