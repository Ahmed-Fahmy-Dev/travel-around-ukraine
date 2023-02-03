import * as yup from 'yup';
import formModel from './formModel';

const { firstName, lastName, login, email, password, retypePassword, telephone } = formModel;

const nameRegExp = /^[a-zA-Z]+$/;
const phoneRegExp = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
const loginAndPassRegExp = /^[a-zA-Z0-9]+$/;

export default [
  yup.object().shape({
    [firstName.name]: yup
      .string()
      .min(2, 'First name must be a minimum of 2 characters')
      .max(25, 'First name must be a maximum of 25 characters')
      .matches(nameRegExp, 'Allowed letters are only a-z, A-Z')
      .required(`${firstName.requiredErrorMsg}`),

    [lastName.name]: yup
      .string()
      .min(2, 'Last name must be a minimum of 2 characters')
      .max(25, 'Last name must be a maximum of 25 characters')
      .matches(nameRegExp, 'Allowed letters are only a-z, A-Z')
      .required(`${lastName.requiredErrorMsg}`),

    [telephone.name]: yup
      .string()
      .matches(phoneRegExp, `${telephone.invalidErrorMsg}`)
      .required(`${telephone.requiredErrorMsg}`),
  }),

  yup.object().shape({
    [email.name]: yup.string().email(`${email.invalidErrorMsg}`).required(`${email.requiredErrorMsg}`),

    [login.name]: yup
      .string()
      .min(3, 'Login must be a minimum of 3 characters')
      .max(10, 'Login must be a maximum of 10 characters')
      .matches(loginAndPassRegExp, 'Allowed characters are only a-z, A-Z, 0-9')
      .required(`${login.requiredErrorMsg}`),

    [password.name]: yup
      .string()
      .min(7, 'Password must be a of minimum of 7 characters')
      .max(30, 'Password must be maximum of 30 characters')
      .matches(loginAndPassRegExp, 'Allowed characters are only a-z, A-Z, 0-9')
      .required(`${password.requiredErrorMsg}`),

    [retypePassword.name]: yup
      .string()
      .oneOf([yup.ref('password')], `${retypePassword.invalidErrorMsg}`)
      .required(`${retypePassword.requiredErrorMsg}`),
  }),
];
