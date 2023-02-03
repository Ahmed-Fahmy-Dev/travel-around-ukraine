import userReducer from './userSlice';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  isModalOpen: false,
  userData: null,
  error: null,
  isLoading: false,
};

describe('userSlice', () => {
  test('should return initial state when app is mount', () => {
    const res = userReducer(undefined, { type: '' });

    expect(res).toEqual(initialState);
  });

  // test('should toggleIsLogin work correct', () => {
  //   const action = { type: toggleIsLogin.type };

  //   const res = userReducer(initialState, action);

  //   expect(res.isLogin).not.toEqual(initialState.isLogin);
  // });

  // test('should toggleIsModalOpen work correct', () => {
  //   const action = { type: toggleIsModalOpen.type };

  //   const res = userReducer(initialState, action);

  //   expect(res.isModalOpen).not.toEqual(initialState.isModalOpen);
  // });
});
