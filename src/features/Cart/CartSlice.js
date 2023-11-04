import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCreateCart,fetchCart,fetchDeleteCart,fetchUpdateCart, fetchResetCart } from './CartAPI';

const initialState = {
  CartItems: [],
  status: 'idle',
  checkCart:false
};

export const fetchCreateCartAsync = createAsyncThunk(
  'Cart/fetchCreateCart',
  async (CartData) => {
    const response = await fetchCreateCart(CartData)
    return response.data
  }
)
export const fetchCartAsync = createAsyncThunk(
  'Cart/fetchCart',
  async () => {
    const response = await fetchCart()
    return response.data
  }
)
export const fetchUpdateCartAsync = createAsyncThunk(
  'Cart/fetchUpdateCart',
  async (cartData) => {
    const response = await fetchUpdateCart(cartData)

    return response.data
  }
)
export const fetchDeleteCartAsync = createAsyncThunk(
  'Cart/fetchDeleteCart',
  async (id) => {
    const response = await fetchDeleteCart(id)
    return response.data
  }
)
export const fetchResetCartAsync = createAsyncThunk(
  'Cart/fetchResetCart',
  async () => {
    const response = await fetchResetCart()
    return response.data
  }
)

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.CartItems.push(action.payload);
      })
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.CartItems=action.payload;
        state.checkCart=true;
      })
      .addCase(fetchUpdateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpdateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const CartItems=[...state.CartItems]
        const index=CartItems.findIndex((item)=>item.id===action.payload.id)
    
        CartItems[index]=action.payload
        state.CartItems=CartItems
      })
      .addCase(fetchDeleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const CartItems=[...state.CartItems]
        const index=CartItems.findIndex((item)=>item.id===action.payload.id)
        CartItems.splice(index,1)
        state.CartItems=CartItems
      })
      .addCase(fetchResetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResetCartAsync.fulfilled, (state, action) => {
        state.status = action.payload;
        state.CartItems=[];
      });
  },
});

export const { increment} = CartSlice.actions;


export const selectCartItems = (state) => state.Cart.CartItems;
export const selectcheckCart = (state) => state.Cart.checkCart;

export default CartSlice.reducer;
