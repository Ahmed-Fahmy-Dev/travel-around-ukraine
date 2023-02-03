import formModel from './formModel';

const { firstName, lastName, login, email, password, retypePassword, telephone, birthdate, gender, avatarUrl } =
  formModel;

export default {
  [firstName.name]: '',
  [lastName.name]: '',
  [login.name]: '',
  [email.name]: '',
  [password.name]: '',
  [retypePassword.name]: '',
  [telephone.name]: '',
  [birthdate.name]: '',
  [gender.name]: '',
  [avatarUrl.name]: '',
};
