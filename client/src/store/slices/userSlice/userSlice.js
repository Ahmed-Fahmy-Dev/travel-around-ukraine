/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  isModalOpen: false,
  userData: null,
  error: null,
  isLoading: false,
};

export const fetchUserInfo = createAsyncThunk('user/feacthUserInfo', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosConfig.get('/customers/customer').then((loggedInCustomer) => loggedInCustomer);
    return data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const fetchUserOrders = createAsyncThunk('user/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosConfig.get('/orders').then((orders) => orders);
    return data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },

    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },

    clearUserData: (state) => {
      state.userData = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchUserOrders.pending, (state) => {
      state.isOrdersLoading = true;
    });

    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isOrdersLoading = false;
    });

    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.ordersError = action.payload;
      state.isOrdersLoading = false;
    });
  },
});

export const { setIsLogin, setIsModalOpen, clearUserData } = userSlice.actions;

export default userSlice.reducer;
