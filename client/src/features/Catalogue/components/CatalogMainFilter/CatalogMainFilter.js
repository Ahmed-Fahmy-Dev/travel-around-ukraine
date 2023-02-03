import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { styled, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CatalogFilterPrice, CatalogFilterSeason, CatalogFilterCategories } from '..';
import {
  setIsFilter,
  setMinPrice,
  setMaxPrice,
  setPricesInFilterParams,
  setAllCategories,
  setCategoriesInFilterParams,
  setAllSeasons,
  setSeasonsInFilterParams,
  fetchFilteredTours,
} from '../../../../store/slices/filterSlice/filterSlice';

const FilterWrapper = styled(Stack)(({ theme }) => ({
  margin: '0 auto',
  width: 252,
  padding: 0,

  [theme.breakpoints.up('tablet')]: {
    width: 540,
  },

  [theme.breakpoints.up('laptop')]: {
    width: 235,
  },
}));

const CatalogMainFilter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const baseCatalogueURL = new URL(location.pathname, window.location.origin);
  const allPrices = useSelector((state) => state.filter.allToursPrices, shallowEqual);
  const prices = useSelector((store) => store.filter.prices);
  const categories = useSelector((store) => store.filter.categories);
  const seasons = useSelector((store) => store.filter.seasons);
  const filterParams = useSelector((store) => store.filter.filterParams);
  const currentPage = useSelector((store) => store.catalogue.currentPage);

  useEffect(() => {
    if (seasons.length > 0 || categories.length > 0 || prices.length > 0) {
      dispatch(setIsFilter(true));
    } else {
      dispatch(setIsFilter(false));
    }
    if (location.search) {
      if (
        categories.length <= 0 &&
        seasons.length <= 0 &&
        categories.length <= 0 &&
        Object.keys(filterParams).length <= 0
      ) {
        const paramsFromURL = new URLSearchParams(location.search);
        const priceFrom = Number(paramsFromURL.get('price_from'));
        const priceTo = Number(paramsFromURL.get('price_to'));
        const categoriesFromParams = paramsFromURL.get('category');
        const seasonsFromParams = paramsFromURL.get('season');

        if (priceFrom && priceTo) {
          dispatch(setMinPrice(priceFrom));
          dispatch(setMaxPrice(priceTo));
          dispatch(setPricesInFilterParams([priceFrom, priceTo]));
        }
        if (categoriesFromParams) {
          dispatch(setAllCategories(categoriesFromParams.split(',')));
          dispatch(setCategoriesInFilterParams(categoriesFromParams.split(',')));
        }
        if (seasonsFromParams) {
          dispatch(setAllSeasons(seasonsFromParams.split(',')));
          dispatch(setSeasonsInFilterParams(seasonsFromParams.split(',')));
        }
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (prices.length <= 0 && categories.length <= 0 && seasons.length <= 0 && Object.keys(filterParams).length > 0) {
      window.location.assign(baseCatalogueURL);
    }

    if (prices.length > 0 || categories.length > 0 || seasons.length > 0) {
      const newURLParams = new URLSearchParams();
      if (prices.length > 0) {
        newURLParams.set('price_from', prices[0]);
        newURLParams.set('price_to', prices[1]);
      }
      if (categories.length > 0) {
        newURLParams.set('category', categories);
      }
      if (seasons.length > 0) {
        newURLParams.set('season', seasons);
      }
      const getNewURL = () => {
        if (newURLParams.toString()) {
          return new URL(`?${newURLParams}`, window.location);
        }
        return baseCatalogueURL;
      };
      const newURL = getNewURL();
      if (window.location.href !== newURL.href) {
        window.location.assign(newURL);
      }
    }

    const filterTours = async () => {
      const searchParams = new URLSearchParams();

      if (prices.length > 0) {
        const filterPrices = allPrices.filter((el) => el >= prices[0] && el <= prices[1]);
        searchParams.set('currentPrice', filterPrices);
      }

      if (categories.length > 0) {
        searchParams.set('categories', categories);
      }

      if (seasons.length > 0) {
        searchParams.set('season', seasons.concat('all seasons'));
      }

      if (searchParams.toString()) {
        await dispatch(fetchFilteredTours({ params: searchParams, page: currentPage }));
      }
    };

    filterTours();
  }, [categories, seasons, prices]);

  return (
    <FilterWrapper>
      <Typography variant="h3">Filter</Typography>
      <Grid container columnSpacing={5} sx={{ p: 0 }}>
        <Grid spacing={4} item xs={12} tablet={6} laptop={12}>
          <CatalogFilterPrice />
          <CatalogFilterCategories />
        </Grid>
        <Grid item xs={12} tablet={6} laptop={12}>
          <CatalogFilterSeason />
        </Grid>
      </Grid>
    </FilterWrapper>
  );
};

export default memo(CatalogMainFilter);
