import { initialValues } from '../data';

const setInitialValue = (isLogin, userData) => {
  if (isLogin && userData) {
    initialValues.firstName = userData.firstName;
    initialValues.lastName = userData.lastName;
    initialValues.email = userData.email;
    initialValues.phone = userData.telephone;

    return initialValues;
  }
  initialValues.firstName = '';
  initialValues.lastName = '';
  initialValues.email = '';
  initialValues.phone = '';

  return initialValues;
};

export default setInitialValue;
