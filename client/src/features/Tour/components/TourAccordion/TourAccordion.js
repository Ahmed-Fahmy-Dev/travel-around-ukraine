import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  position: 'relative',
  padding: 0,

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '1px',
    width: 'calc(100% - 35px)',
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  '.MuiAccordionSummary-content': {
    margin: 0,
    padding: '20px 0',

    '&.Mui-expanded': {
      margin: 0,
    },
  },

  '.MuiAccordionSummary-expandIconWrapper': {
    color: `${theme.palette.divider}`,
    position: 'absolute',
    top: '-18px',
    right: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: '0 0 30px',
});

// eslint-disable-next-line react/prop-types
const TourAccordion = ({ title, children }) => (
  <div>
    <MuiAccordion elevation={0} square defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
        <Typography variant="h2">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  </div>
);

TourAccordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

TourAccordion.defaultProps = {
  title: 'Accordion',
  children: <p>Accordion text</p>,
};

export default memo(TourAccordion);
