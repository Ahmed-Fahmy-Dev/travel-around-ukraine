import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProduct from '../../../api/getProduct';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export const fetchTour = createAsyncThunk('tour/fetchTour', async (itemNo, { rejectWithValue }) => {
  try {
    return await getProduct(itemNo);
  } catch (err) {
    return rejectWithValue('Something wrong happened, please reload the page or try again later.');
  }
});

const tourSlice = createSlice({
  name: 'tour',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchTour.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchTour.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchTour.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default tourSlice.reducer;
