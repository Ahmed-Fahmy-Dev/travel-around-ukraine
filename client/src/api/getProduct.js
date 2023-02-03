import axiosConfig from '../axiosConfig';

const getProduct = async (itemNo) => {
  try {
    const { data, status } = await axiosConfig(`/products/${itemNo}`);

    if (status === 200) {
      return data;
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default getProduct;
