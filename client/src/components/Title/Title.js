import { Typography, styled } from '@mui/material';

const Title = styled((props) => <Typography variant="h3" color="text.primary" {...props} />)({
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: 20,
});

export default Title;
