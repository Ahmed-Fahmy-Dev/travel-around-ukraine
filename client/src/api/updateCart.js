import axiosConfig from '../axiosConfig';

const updateCart = async (cart) => {
  const products = cart.map(({ product: { _id }, cartQuantity }) => ({
    product: _id,
    cartQuantity,
  }));

  const body = { products };

  try {
    const { data, status } = await axiosConfig.put('/cart', body);
    if (status >= 200 && status <= 300) return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default updateCart;
