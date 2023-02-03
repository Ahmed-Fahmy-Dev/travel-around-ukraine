import axios from 'axios';

const postSignUpData = async ({
  firstName,
  lastName,
  login,
  email,
  password,
  telephone,
  birthdate,
  gender,
  avatarUrl,
}) => {
  const body = { firstName, lastName, login, email, password, telephone, birthdate, gender, avatarUrl };
  try {
    const { status } = await axios.post('/customers', body);

    return { isSuccess: status === 200 };
  } catch (err) {
    return { error: err.response.data };
  }
};

export default postSignUpData;
