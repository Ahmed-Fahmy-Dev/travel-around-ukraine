import axiosConfig from '../axiosConfig';

const postNewOrder = async ({
  firstName,
  lastName,
  email,
  phone,
  addressOne,
  addressTwo,
  city,
  state,
  zipcode,
  country,
  cardType,
  nameOnCard,
  cardNumber,
  expiryDate,
  cvv,
}) => {
  const body = {
    firstName,
    lastName,
    deliveryAddress: {
      country,
      city,
      state,
      zipcode,
      addressOne,
      addressTwo,
      // ? addresses: [addressOne, addressTwo],
    },
    paymentInfo: {
      cardType,
      cardNumber,
      nameOnCard,
      expiryDate,
      cvv,
    },
    email,
    mobile: phone,
    letterSubject: 'Thank you for order! You are welcome!',
    letterHtml: '<h1>Your order is placed</h1>',
  };

  const token = localStorage.getItem('token');
  const products = JSON.parse(localStorage.getItem('cart'));

  // add customerId to body if customer is logged in
  if (token) {
    try {
      const {
        data: { _id },
      } = await axiosConfig.get('/customers/customer');

      body.customerId = _id;
    } catch (e) {
      throw e.response.data;
    }
  }

  // add products from local storage cart to body if user is not logged in
  if (!token && products) {
    body.products = products;
  }

  try {
    const { data } = await axiosConfig.post('/orders', body);

    return data;
  } catch (e) {
    return e.response.data;
  }
};

export default postNewOrder;
