/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, MenuList, MenuItem, Typography, styled } from '@mui/material';

const ItemBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gridTemplateRows: 'repeat(2, 1fr)',
  gridColumnGap: '15px',
  gridRowGap: '15px',
  boxSizing: 'border-box',
});

const HeaderFilterItems = () => {
  const navigate = useNavigate();
  const { data, error } = useSelector((store) => store.searchBar, shallowEqual);

  //  TO DO ItemBox responsivness/adaptivness
  const searchBarList = data.map(({ imageUrls, name, currentPrice, season, itemNo }) => (
    <MenuItem onClick={() => navigate(`/tour/${itemNo}`)} key={name}>
      <ItemBox>
        <Box sx={{ gridArea: '1 / 1 / 3 / 3' }}>
          <img src={imageUrls[0]} alt={name} width="90px" height="50px" />
        </Box>
        <Box sx={{ gridArea: '1 / 3 / 2 / 5' }}>{name}</Box>
        <Box sx={{ gridArea: '2 / 3 / 3 / 4' }}>{currentPrice}€</Box>
        <Box sx={{ gridArea: '2 / 4 / 3 / 5' }}>{season}</Box>
      </ItemBox>
    </MenuItem>
  ));

  const searchResults = (
    <>
      <Typography align="center" sx={{ paddingTop: '14px' }} variant="h3">
        Search results: {data.length}
      </Typography>
      <MenuList>{searchBarList}</MenuList>
    </>
  );

  return (
    <Paper
      sx={{
        borderRadius: '5px',
        position: 'absolute',
        minWidth: '200px',
        padding: '20px',
        maxHeight: '60vh',
        overflowY: 'auto',
      }}
    >
      {data.length ? searchResults : null}

      {!data.length && !error && (
        <Typography variant="h3" align="center" gutterBottom={false}>
          No results found
        </Typography>
      )}

      {error && (
        <Typography align="center" gutterBottom={false} sx={{ color: 'error.main' }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default memo(HeaderFilterItems);
