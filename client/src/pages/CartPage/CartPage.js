import React, { useEffect } from 'react';

import { Box, Container, Stack, styled, Typography } from '@mui/material';
// Redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchCart, setCartFromLocal, closeSnackBar } from '../../store/slices/cartSlice/cartSlice';

import { CartItem, TotalInfoDialog } from '../../features/Cart/components';
import { SnackBar } from '../../components';

const ContentWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),

  [theme.breakpoints.up('laptop')]: {
    flexDirection: 'row',
  },
}));

const CartItemsList = styled((props) => <Stack component="ul" {...props} />)(({ theme }) => ({
  padding: 0,
  margin: 0,
  flexGrow: 1,
  gap: theme.spacing(2),

  listStyleType: 'none',
}));

const CartPage = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);
  const { data, snackBar } = useSelector((store) => store.cart, shallowEqual);
  const { isSnackBarOpen, severity, text } = snackBar;

  useEffect(() => {
    isLogin ? dispatch(fetchCart()) : dispatch(setCartFromLocal());
  }, []);

  const handleClose = () => dispatch(closeSnackBar());

  // components saved into constants
  const cartContentWrapper = (
    <ContentWrapper>
      <CartItemsList>
        {data.map(({ product: { imageUrls, name, currentPrice, duration, itemNo, _id }, cartQuantity }) => (
          <li key={_id}>
            <CartItem
              imageUrls={imageUrls}
              name={name}
              currentPrice={currentPrice}
              duration={duration}
              cartQuantity={cartQuantity}
              itemNo={itemNo}
              id={_id}
              isLogin={isLogin}
            />
          </li>
        ))}
        <li>
          <CartItem />
        </li>
      </CartItemsList>
      <Box flexGrow={1}>
        <TotalInfoDialog cart={data} />
      </Box>
    </ContentWrapper>
  );

  return (
    <Box marginTop="100px" marginBottom="150px" component="section" paddingY={3}>
      <Container>
        <Typography marginBottom={2} variant="h2">
          Cart
        </Typography>

        {data.length ? (
          cartContentWrapper
        ) : (
          <Typography variant="h2" align="center">
            Your cart is empty!
          </Typography>
        )}
      </Container>

      <SnackBar isOpen={isSnackBarOpen} severity={severity} text={text} handleClose={handleClose} />
    </Box>
  );
};

export default CartPage;
