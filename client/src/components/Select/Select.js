import { Select as MuiSelect, styled } from '@mui/material';

const Select = styled(MuiSelect)(({ theme }) => ({
  marginBottom: '10px',
  fontWeight: 700,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.divider}`,

    transition: theme.transitions.create('border-color'),
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.primary.main}`,
  },
  '.MuiSelect-icon': {
    transition: theme.transitions.create('transform'),
  },
}));

export default Select
