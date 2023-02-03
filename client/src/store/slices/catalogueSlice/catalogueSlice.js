/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';

export const fetchFavoriteProducts = createAsyncThunk(
  'products/fetchFavoriteProducts ',
  async (isLogin, { rejectWithValue }) => {
    if (isLogin) {
      try {
        const { data } = await axiosConfig.get('/wishlist');
        if (data === null) {
          const { status } = await axiosConfig.post('/wishlist');
          if (status >= 200 && status <= 300) {
            return [];
          }
        }
        return data.products;
      } catch (err) {
        return rejectWithValue(err);
      }
    } else {
      let favorites = JSON.parse(localStorage.getItem('inFavorites'));
      favorites === null ? (favorites = []) : null;
      localStorage.setItem('inFavorites', JSON.stringify(favorites));
      return favorites;
    }
  }
);

export const fetchCatalogueProducts = createAsyncThunk(
  'products/fetchCatalogueProducts',
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`products/filter?perPage=5&startPage=${page}`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchPopularProducts = createAsyncThunk(
  'products/fetchPopularProducts ',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig('/products/filter?isPopular=true');
      return data.products;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addWishList = createAsyncThunk(
  'products/fetchAddItem',
  async ({ isLogin, product, id }, { rejectWithValue }) => {
    if (isLogin) {
      try {
        const { data } = await axiosConfig.put(`/wishlist/${id}`);
        return data.products;
      } catch (err) {
        return rejectWithValue(err);
      }
    } else {
      const favorites = JSON.parse(localStorage.getItem('inFavorites'));
      favorites.push(product);
      localStorage.setItem('inFavorites', JSON.stringify(favorites));
      return favorites;
    }
  }
);

export const deleteFromWishList = createAsyncThunk(
  'products/deleteFromFavorites',
  async ({ isLogin, lastItem, id }, { rejectWithValue }) => {
    if (isLogin) {
      try {
        if (lastItem) {
          const { status } = await axiosConfig.delete('/wishlist');
          if (status >= 200 && status <= 300) {
            return [];
          }
        }
        const { data } = await axiosConfig.delete(`wishlist/${id}`);
        return data.products;
      } catch (err) {
        return rejectWithValue(err);
      }
    } else {
      const favorites = JSON.parse(localStorage.getItem('inFavorites')).filter(({ _id }) => _id !== id);
      localStorage.setItem('inFavorites', JSON.stringify(favorites));
      return favorites;
    }
  }
);

const catalogueSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    popular: [],
    isLoading: false,
    error: null,
    totalPages: null,
    currentPage: 1,
    favorites: [],
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = Number(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogueProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCatalogueProducts.fulfilled, (state, action) => {
      const { products, productsQuantity } = action.payload;
      state.isLoading = false;
      state.products = products;
      state.totalPages = productsQuantity;
    });
    builder.addCase(fetchCatalogueProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPopularProducts.fulfilled, (state, action) => {
      state.popular = action.payload;
    });
    builder.addCase(fetchPopularProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchFavoriteProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    builder.addCase(addWishList.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    builder.addCase(deleteFromWishList.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { setCurrentPage } = catalogueSlice.actions;
export default catalogueSlice.reducer;