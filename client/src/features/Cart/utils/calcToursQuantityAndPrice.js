/* eslint-disable consistent-return */
const calcToursQuantityAndPrice = (cart) => {
  const toursQuantity = cart.map(({ cartQuantity }) => cartQuantity).reduce((total, num) => total + num);

  const toursPrice = cart
    .map(({ product: { currentPrice }, cartQuantity }) => currentPrice * cartQuantity)
    .reduce((total, num) => total + num);

  return { toursQuantity, toursPrice };
};

export default calcToursQuantityAndPrice;
