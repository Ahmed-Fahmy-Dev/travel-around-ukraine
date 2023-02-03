/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';
import updateCart from '../../../api/updateCart';
import writeToLocalStorage from '../../utils/writeToLocalStorage';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  snackBar: {
    isSnackBarOpen: false,
    severity: 'success',
    text: '',
  },
};

/**
 * fetches online cart from DB
 * @param {string} testLoad - a test payload since the createAsyncThunk functions doesnt work properly if not supplied with payload, to be inspected later.
 * @returns an object which contains a products array
 */
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosConfig('/cart');
    return data;
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please reload the page or try again later.');
  }
});

/**
 * deletes online cart from DB
 * @returns void
 */

export const deleteOnlineCart = createAsyncThunk('cart/deleteOnlineCart', async (_, { rejectWithValue }) => {
  try {
    await axiosConfig.delete('/cart');
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please try again later.');
  }
});

/**
 * adds product to online cart
 * @param {string} productId - the product's unique id property.
 * @returns an object which containts an updated products array after the product added or a products cartQuantity property increased.
 */

export const addProduct = createAsyncThunk('cart/addProduct', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axiosConfig.put(`/cart/${productId}`);
    return data;
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please try again later.');
  }
});

/**
 * decreases product quantity in online cart
 * @param {string} productId - the product's unique id property.
 * @returns an object which contains an updated products array after the product quantity decreased.
 */

export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axiosConfig.delete(`/cart/product/${productId}`);
    return data;
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please try again later.');
  }
});

/**
 * deletes product from online cart
 * @param {string} productId - the product's unique id property.
 * @returns an object which contains an updated products array after the product deletion.
 */

export const deleteProduct = createAsyncThunk(
  'cart/deleteProduct',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosConfig.delete(`/cart/${productId}`);
      const { _id } = data.products[0].product;
      if (data.products.length === 1 && _id === productId) {
        dispatch(deleteOnlineCart());
      }
      return data;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue('Something went wrong. Please try again later.');
    }
  }
);

/**
 * merge local with online cart
 * @param {array} localCart - the local cart array saved in local storage
 * @returns an updated products array after merging both local and online cart
 */

export const migrateCart = createAsyncThunk('cart/migrateCart', async (localCart, { getState, rejectWithValue }) => {
  const state = getState();

  try {
    let mergedCart;

    if (state.cart.data.length) {
      // the reduce method merges both online and local arrays, it iterates through the online cart and checks whether an object with the same unique id exists in the local cart, if not then it pushes this object into the local cart, it the object exists then it compares the cartQuantity value of both objects and updates the cartQuantity according to the highest value between both.
      const combinedCarts = state.cart.data.reduce((localCartArray, onlineCartItem) => {
        const existingItem = localCartArray.find(({ product }) => product._id === onlineCartItem.product._id);
        if (existingItem) {
          if (existingItem.cartQuantity < onlineCartItem.cartQuantity) {
            existingItem.cartQuantity = onlineCartItem.cartQuantity;
          }
        } else {
          localCartArray.push(onlineCartItem);
        }

        return localCartArray;
      }, localCart);

      mergedCart = combinedCarts;
    } else {
      mergedCart = localCart;
    }

    const { products } = await updateCart(mergedCart);
    return products;
  } catch (err) {
    console.error(err.message);
    return rejectWithValue('Something went wrong. Please try again later.');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    setCartFromLocal: (state) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        state.data = cart;
      }
    },

    addProductToLocal: (state, action) => {
      const index = state.data.findIndex((item) => item.product._id === action.payload._id);

      if (index === -1) {
        state.data.push({ product: { ...action.payload }, cartQuantity: 1 });
      } else {
        state.data[index].cartQuantity += 1;
      }

      writeToLocalStorage('cart', state.data);

      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Product added successfully';
      state.snackBar.severity = 'success';
    },

    deleteCart: (state) => {
      state.data = [];
    },

    decreaseProductFromLocal: (state, action) => {
      const index = state.data.findIndex((item) => item.product._id === action.payload);
      state.data[index].cartQuantity -= 1;
      writeToLocalStorage('cart', state.data);

      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Product removed successfully';
      state.snackBar.severity = 'success';
    },

    delProductFromLocal: (state, action) => {
      const index = state.data.findIndex((item) => item.product._id === action.payload);
      state.data.splice(index, 1);
      writeToLocalStorage('cart', state.data);

      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Product deleted successfully';
      state.snackBar.severity = 'success';
    },

    closeSnackBar: (state) => {
      state.snackBar.isSnackBarOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      if (action.payload) {
        const { products } = action.payload;
        state.data = products;
      }
      state.isLoading = false;
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(deleteOnlineCart.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(deleteOnlineCart.fulfilled, (state) => {
      state.data = [];
      state.isLoading = false;
    });

    builder.addCase(deleteOnlineCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(addProduct.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      if (action.payload) {
        const { products } = action.payload;
        state.data = products;
      }
      state.isLoading = false;
      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Product added successfully';
      state.snackBar.severity = 'success';
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Something went wrong';
      state.snackBar.severity = 'error';
    });

    builder.addCase(decreaseQuantity.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(decreaseQuantity.fulfilled, (state, action) => {
      const { products } = action.payload;
      state.data = products;
      state.isLoading = false;

      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Product removed successfully';
      state.snackBar.severity = 'success';
    });

    builder.addCase(decreaseQuantity.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Something went wrong';
      state.snackBar.severity = 'error';
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      // arg in this case is the product unique id which was passed as an argument to the thunk function
      const { arg } = action.meta;
      const { products } = action.payload;
      const { _id } = products[0].product;

      // the below condition states that if there is only one product in the products Array, and its id matches the unique id passed to the thunk function, that means that this is the last and only product in the products array and after deletion the cart will be empty.
      if (products.length === 1 && _id === arg) {
        state.data = [];
      } else state.data = products;

      state.isLoading = false;
      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Product deleted successfully';
      state.snackBar.severity = 'success';
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.snackBar.isSnackBarOpen = true;
      state.snackBar.text = 'Something went wrong';
      state.snackBar.severity = 'error';
    });

    builder.addCase(migrateCart.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(migrateCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      localStorage.removeItem('cart');
    });

    builder.addCase(migrateCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default cartSlice.reducer;

export const {
  setCartFromLocal,
  addProductToLocal,
  deleteCart,
  decreaseProductFromLocal,
  delProductFromLocal,
  closeSnackBar,
} = cartSlice.actions;
