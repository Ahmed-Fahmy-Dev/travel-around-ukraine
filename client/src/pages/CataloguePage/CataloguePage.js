import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { styled, Stack, Box, Container, Typography, Pagination, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { CatalogTourCard, CatalogMainSection, CatalogMainFilter } from '../../features/Catalogue/components';
import { fetchCatalogueProducts, setCurrentPage } from '../../store/slices/catalogueSlice/catalogueSlice';
import { gettWishList } from '../../store/slices/inFavoritesSlice/inFavoritesSlice';
import scrollToTop from '../../layout/utils/scrollToTop';

const FilterContainer = styled((props) => <Grid item xs={12} {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: 10,
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
  padding: '25px 0',
  height: 'fit-content',

  [theme.breakpoints.up('laptop')]: {
    width: 295,
  },
}));

const ResetButton = styled((props) => (
  <Button
    variant="text"
    startIcon={
      <CloseIcon
        sx={{
          width: '14px',
          height: '14px',
          color: 'gray',
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  padding: '7px 20px',
  marginBottom: '12px',
  border: '1px solid lightgrey',
  background: 'none',
  fontWeight: 500,
  fontSize: 12,
  textTransform: 'none',
  color: theme.palette.text.primary,
  alignSelf: 'center',

  '&:hover': {
    background: 'none',
    filter: 'brightness(1.3)',
    color: theme.palette.text.primary,
  },
}));

// TO DO: fix the routing logic, all pagination pages routes has to be catalogue/page/pageNO

const CataloguePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => state.catalogue.products, shallowEqual);
  const isLoading = useSelector((state) => state.catalogue.isLoading);
  const inFavorites = useSelector((state) => state.favorites.inFavorites);
  const isLogin = useSelector((store) => store.user.isLogin);
  // const pages = useSelector((store) => store.catalogue.totalPages);
  const currentPage = useSelector((store) => store.catalogue.currentPage);
  const isFilter = useSelector((state) => state.filter.isFilter);
  const filteredTours = useSelector((state) => state.filter.tours);
  const countriesPerPage = 5;

  const currentItems = () => {
    if (isFilter) {
      return filteredTours;
    }
    return products;
  };

  const pages = () => {
    if (isFilter) {
      return useSelector((store) => store.filter.toursQty);
    }
    return useSelector((store) => store.catalogue.totalPages);
  };
  const totalPages = Math.ceil(pages() / countriesPerPage);

  useEffect(() => {
    dispatch(fetchCatalogueProducts(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(gettWishList(isLogin));
  }, [isLogin]);

  const resetFilter = () => {
    const baseCatalogueURL = new URL(location.pathname, window.location.origin)
    window.location.assign(baseCatalogueURL)
  }

  return (
    <>
      {!isLoading ? (
        <Box sx={{ backgroundColor: '#EDEDED', paddingBottom: '150px' }}>
          <CatalogMainSection />
          <Container>
            <Grid container sx={{ mt: '60px', gap: '40px' }}>
              <FilterContainer>
                <CatalogMainFilter />
              </FilterContainer>

              <Grid item xs={12} laptop sx={{ p: 0 }}>
                {!isFilter && (
                  <Typography variant="h2" sx={{ textTransform: 'uppercase', mb: '25px' }}>
                    Tours
                  </Typography>
                )}

                {isFilter && (
                  <>
                    {filteredTours.length > 0 ? (
                      <Typography variant="h2" sx={{ mb: '12px' }}>
                        Results for your request
                      </Typography>
                    ) : (
                      <Typography variant="h2" sx={{ mb: '12px' }}>
                        No results for your request
                      </Typography>
                    )}
                    <ResetButton onClick={resetFilter}>reset filter</ResetButton>
                  </>
                )}

                <Stack spacing={2}>
                  {currentItems().map(({ name, currentPrice, duration, description, imageUrls, _id, itemNo }) => {
                    const checkForFavorites = inFavorites.find((itemId) => _id === itemId);
                    return (
                      <CatalogTourCard
                        key={_id}
                        name={name}
                        description={description}
                        currentPrice={currentPrice}
                        duration={duration}
                        imageUrls={imageUrls}
                        itemNo={itemNo}
                        id={_id}
                        inFavorites={checkForFavorites ? !!checkForFavorites : false}
                        inFavoritesCounter={inFavorites.length - 1}
                      />
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: '50px' }}>
            {totalPages <= 1 ? null : (
              <Pagination
                count={totalPages}
                color="primary"
                page={Number(currentPage)}
                onClick={(e) => {
                  dispatch(setCurrentPage(Number(e.target.closest('button').textContent)));
                  scrollToTop();
                }}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Typography variant="h2" sx={{ paddingTop: '400px', paddingBottom: '400px', textAlign: 'center' }}>
          Loading...
        </Typography>
      )}
      {}
    </>
  );
};

export default CataloguePage;
