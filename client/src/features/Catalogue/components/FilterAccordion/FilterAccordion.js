import React,{memo} from 'react';
import PropTypes from 'prop-types';
import { styled, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledAccordion = styled((props) => <Accordion elevation={0} square defaultExpanded {...props} />)(
  ({ theme }) => ({
    position: 'relative',
    boxShadow: 0,

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '1px',
      width: '100%',
      borderTop: `1px solid ${theme.palette.divider}`,
    },

    '&:before': {
      background: 'none',
    }

  })
);

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: '0 0 40px',
});

const AccordionTitle = styled(Typography)(() => ({
  padding: 0,
  flexShrink: 0,
  fontWeight: 700,
}));

const FilterAccordion = ({ title, children }) => (
  <StyledAccordion>
    <AccordionSummary sx={{ p: '0' }} expandIcon={<ExpandMoreIcon fontSize="medium" color="primary" />}>
      <AccordionTitle>{title}</AccordionTitle>
    </AccordionSummary>
    <StyledAccordionDetails>{children}</StyledAccordionDetails>
  </StyledAccordion>
);

FilterAccordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

FilterAccordion.defaultProps = {
  title: '',
  children: <p />,
};

export default memo(FilterAccordion);
