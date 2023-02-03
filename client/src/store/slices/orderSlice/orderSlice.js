import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postNewOrder from '../../../api/postNewOrder';
// import axios from 'axios';

const initialState = {
  currentStep: 0,
  isModalOpen: false,
  isLoading: false,
  orderInfo: {},
};

export const createNewOrder = createAsyncThunk('order/createNewOrder', async (orderData, { rejectWithValue }) => {
  try {
    const orderInfo = await postNewOrder(orderData);

    // checks if order does not contain order object (possible in cases when server returns response with incorrect data passed in input fields)
    if (!orderInfo.order) {
      await Promise.reject(orderInfo);
    }

    return orderInfo;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    increaseStep: (state) => {
      state.currentStep += 1;
    },
    decreaseStep: (state) => {
      if (state.currentStep >= 1) {
        state.currentStep -= 1;
      }
    },
    resetStep: (state) => {
      state.currentStep = 0;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNewOrder.fulfilled, (state, action) => {
      state.orderInfo = action.payload.order;
      state.isLoading = false;
    });
    builder.addCase(createNewOrder.rejected, (state, action) => {
      state.orderInfo = action.payload;
      state.isLoading = false;
    });
  },
});

export const { increaseStep, decreaseStep, resetStep, setIsModalOpen } = orderSlice.actions;

export default orderSlice.reducer;
