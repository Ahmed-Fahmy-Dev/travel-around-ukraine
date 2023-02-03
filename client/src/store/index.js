import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import tourReducer from './slices/tourSlice/tourSlice';
import catalogueReducer from './slices/catalogueSlice/catalogueSlice';
import cartReducer from './slices/cartSlice/cartSlice';
import filterReducer from './slices/filterSlice/filterSlice';
import orderSlice from './slices/orderSlice/orderSlice';
import searchBarReducer from './slices/searchBarSlice/searchBarSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tour: tourReducer,
    catalogue: catalogueReducer,
    cart: cartReducer,
    filter: filterReducer,
    order: orderSlice,
    searchBar: searchBarReducer,
  },
});

export default store;
