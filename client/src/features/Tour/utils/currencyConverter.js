/* eslint-disable consistent-return */
const currencyConverter = (currentPrice, currency) => {
  switch (currency) {
    case 'eur': {
      return currentPrice;
    }

    case 'usd': {
      return parseInt(currentPrice * 1.04, 10);
    }

    case 'uah': {
      return parseInt(currentPrice * 38.45, 10);
    }

    default:
  }
};

export default currencyConverter;
