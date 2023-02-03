import React, { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { FilterAccordion, OutlinedToggleButton } from '..';
// import { fetchCatalogue } from '../../../../store/slices/catalogueSlice/catalogueSlice';

const CatalogFilterDuration = () => {
  // const dispatch = useDispatch();
  const products = useSelector((state) => state.catalogue.products, shallowEqual);

  const sorting = () => {
    const duration = [...new Set(products.map((el) => el.duration))];

    const hours = duration
      .filter((el) => el.indexOf('hour') !== -1)
      .sort((a, b) => a.match(/\d+/)[0] - b.match(/\d+/)[0]);

    const days = duration
      .filter((el) => el.indexOf('day') !== -1)
      .sort((a, b) => a.match(/\d+/)[0] - b.match(/\d+/)[0]);

    return [...hours, ...days];
  };

  const sortingToursDuration = sorting();

  // useEffect(() => {
  //   dispatch(fetchCatalogue());
  // }, []);

  return (
    <FilterAccordion title="Duration">
      <Grid container spacing={1}>
        {sortingToursDuration.map((el) => (
          <Grid xs={4} key={el}>
            <OutlinedToggleButton value={el}>{el}</OutlinedToggleButton>
          </Grid>
        ))}
      </Grid>
    </FilterAccordion>
  );
};

export default memo(CatalogFilterDuration);
