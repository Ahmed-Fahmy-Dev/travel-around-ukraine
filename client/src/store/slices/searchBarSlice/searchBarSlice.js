import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';

const initialState = {
  data: [],
  isSearchBarOpen: false,
  isLoading: false,
  error: null,
};

export const searchProductByString = createAsyncThunk(
  'searchBar/searchProductByString',
  async (searchPhrases, { rejectWithValue }) => {
    const body = {
      query: searchPhrases,
    };

    try {
      const { data } = await axiosConfig.post(`/products/search`, body);
      return data;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue('Something went wrong. Please try again later.');
    }
  }
);

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,

  reducers: {
    setIsSearchBarOpen: (state, action) => {
      state.isSearchBarOpen = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(searchProductByString.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(searchProductByString.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(searchProductByString.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setIsSearchBarOpen } = searchBarSlice.actions;

export default searchBarSlice.reducer;
