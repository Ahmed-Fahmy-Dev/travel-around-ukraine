import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';

export const fetchFilteredTours = createAsyncThunk(
  'products/fetchFilteredTours',
  async ({ params, page }, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig(`/products/filter?${params}&perPage=5&startPage=${page}`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  tours: [],
  toursQty: null,
  filterParams: {},
  isFilter: false,
  allToursPrices: [],
  prices: [],
  categories: [],
  seasons: [],
  error: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    setIsFilter: (state, action) => {
      state.isFilter = action.payload;
    },
    setAllToursPrices: (state, action) => {
      state.allToursPrices = action.payload;
    },
    setMinPrice: (state, action) => {
      state.prices[0] = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.prices[1] = action.payload;
    },
    setPricesInFilterParams: (state, action) => {
      state.filterParams.prices = action.payload;
    },
    setCategories: (state, action) => {
      if (state.categories.includes(action.payload)) {
        state.categories = state.categories.filter((el) => el !== action.payload);
      } else {
        state.categories.push(action.payload);
      }
    },
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoriesInFilterParams: (state, action) => {
      state.filterParams.categories = action.payload;
    },
    setSeasons: (state, action) => {
      if (state.seasons.includes(action.payload)) {
        state.seasons = state.seasons.filter((el) => el !== action.payload);
      } else {
        state.seasons.push(action.payload);
      }
    },
    setAllSeasons: (state, action) => {
      state.seasons = action.payload;
    },
    setSeasonsInFilterParams: (state, action) => {
      state.filterParams.season = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredTours.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchFilteredTours.fulfilled, (state, action) => {
      const { products, productsQuantity } = action.payload;
      state.tours = products;
      state.toursQty = productsQuantity;
    });
    builder.addCase(fetchFilteredTours.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const {
  setIsFilter,
  setAllToursPrices,
  setMinPrice,
  setMaxPrice,
  setPricesInFilterParams,
  setCategories,
  setAllCategories,
  setCategoriesInFilterParams,
  setSeasons,
  setAllSeasons,
  setSeasonsInFilterParams,
} = filterSlice.actions;

export default filterSlice.reducer;
