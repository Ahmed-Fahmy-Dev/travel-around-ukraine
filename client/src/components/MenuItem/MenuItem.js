import { MenuItem as MuiMenuItem, styled, alpha } from '@mui/material';

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  transition: theme.transitions.create(['color', 'background-color']),

  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    color: theme.palette.primary.main,
  },

  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

export default MenuItem;
