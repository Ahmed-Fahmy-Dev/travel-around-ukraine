import { Box as MuiBox, styled } from '@mui/material';

const BoxWrapper = styled(MuiBox)(({ theme }) => ({
  position: 'sticky',
  top: 90,
  padding: '20px 20px 30px',
  borderRadius: 5,

  border: `1px solid ${theme.palette.divider}`,
}));

export default BoxWrapper;
