import React, { useState } from 'react';
import { Box, MenuItem, Menu, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const pages = [
  {
    name: 'Home',
    link: '/',
    innerContent: 'Home',
  },
  {
    name: 'Catalogue',
    link: '/catalogue',
    innerContent: 'Catalogue',
  },
  {
    name: 'LogIn',
    link: '/login',
    innerContent: 'Log In',
  },
  {
    name: 'Account',
    link: '/user',
    innerContent: 'Account',
  },
  {
    name: 'Cart',
    link: '/cart',
    innerContent: 'Cart',
  },
];

const styleNavLink = {
  display: 'block',
  textDecoration: 'none',
  color: 'text.primary',
  width: '100%',
  padding: '6px 16px',
};

const boxSX = {
  flexGrow: 1,
  display: { xs: 'flex', laptop: 'none' },
  justifyContent: 'flex-end',
};

const menuSX = {
  display: { xs: 'flex', laptop: 'none' },
};

const menuItemSX = {
  padding: 0,
  width: '40vw',
  maxWidth: '200px',
  height: '50px',
};

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const transformOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const BurgerMenu = ({ isLogin }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

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
        {pages.map(({ name, link, innerContent }) => {
          if (name === 'LogIn' && isLogin) {
            return null;
          }
          if (name === 'Account' && !isLogin) {
            return null;
          }

          return (
            <MenuItem key={name} onClick={handleCloseNavMenu} sx={menuItemSX}>
              <Typography component={NavLink} to={link} key={name} sx={styleNavLink} end>
                {innerContent}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

BurgerMenu.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default BurgerMenu;
