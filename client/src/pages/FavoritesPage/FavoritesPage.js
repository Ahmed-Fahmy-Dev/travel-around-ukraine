import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { CatalogTourCard } from '../../features/Catalogue/components';
import { fetchFavoriteProducts } from '../../store/slices/catalogueSlice/catalogueSlice';
// import { gettWishList } from '../../store/slices/inFavoritesSlice/inFavoritesSlice';
// import { fetchCatalogue } from '../../store/slices/catalogueSlice/catalogueSlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const inFavorites = useSelector((state) => state.catalogue.favorites, shallowEqual);
  const isLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    dispatch(fetchFavoriteProducts(isLogin));
  }, []);
  return (
    <>
      {inFavorites.length === 0 ? (
        <Typography variant="h2" sx={{ padding: '100px', textAlign: 'center' }}>
          No items found
        </Typography>
      ) : (
        <Grid container sx={{ mt: '60px', gap: '40px', p: 5, justifyContent: 'center' }}>
          {inFavorites.map(({ name, currentPrice, duration, description, imageUrls, _id, itemNo }, index) => (
            <CatalogTourCard
              key={itemNo}
              id={_id}
              name={name}
              description={description}
              currentPrice={currentPrice}
              duration={duration}
              imageUrls={imageUrls}
              itemNo={itemNo}
              isFavorite={!!inFavorites}
              lastItem={inFavorites.length === 1 && true}
              product={inFavorites[index]}
            />
          ))}
        </Grid>
      )}
      {}
    </>
  );
};

export default FavoritesPage;