import axiosConfig from '../axiosConfig';

/**
 * subscribe user
 * @param {object} email - the form value object with email key destructured
 * @returns in case of successfull api call it returns a success object and in case of failure it returns an error object
 */

const subscribeUser = async ({ email }) => {
  const newSubscriber = {
    email,
    letterSubject: 'User Subscribed',
    letterHtml: `<h1>Your mail ${email} has been subscribed succesfully to our Newsletter.</h1>`,
  };

  try {
    const { status } = await axiosConfig.post('./subscribers', newSubscriber);
    return { isSuccess: status === 200 };
  } catch (err) {
    return { error: err.response.data };
  }
};

export default subscribeUser;
