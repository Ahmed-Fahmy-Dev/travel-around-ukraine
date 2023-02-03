import React, { memo } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { FilterAccordion, OutlinedToggleButton } from '..';

const categories = ['City tours', 'Relax', 'History & culture', 'Nature', 'Winter tours'];

const CatalogFilterCategories = () => (
  <FilterAccordion title="Categories">
    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1}>
      {categories.map((el) => (
        <Grid key={el}>
          <OutlinedToggleButton value={el}>{el}</OutlinedToggleButton>
        </Grid>
      ))}
    </Grid>
  </FilterAccordion>
);

export default memo(CatalogFilterCategories);
