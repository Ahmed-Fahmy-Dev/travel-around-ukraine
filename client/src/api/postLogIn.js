import axiosConfig from '../axiosConfig';

const postLogIn = async (userData) => {
  try {
    const { data } = await axiosConfig.post('/customers/login', userData).then((res) => res);
    return data;
  } catch (err) {
    return err.response.data;
  }
};

export default postLogIn;
