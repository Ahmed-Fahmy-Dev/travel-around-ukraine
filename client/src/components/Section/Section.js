import { Box as MuiBox, styled } from '@mui/material';

const Section = styled(MuiBox)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: 15,
  marginBottom: 20,
}));

export default Section