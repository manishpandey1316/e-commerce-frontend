import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCreateOrder, fetchOrderbyUser,fetchOrders,fetchUpdateOrder,fetchOrdersByFilter} from './OrderAPI';

const initialState = {
  UserOrders:[],
  total:null,
  Orders:[],
  CurrentOrder:null,
  status: 'idle',
};

export const fetchCreateOrderAsync = createAsyncThunk(
  'Order/fetchCreateOrder',
  async (orderData) => {
    const response = await fetchCreateOrder(orderData)
    return response.data
  }
)
export const fetchUpdateOrderAsync = createAsyncThunk(
  'Order/fetchUpdateOrder',
  async (orderData) => {
    const response = await fetchUpdateOrder(orderData)
    return response.data
  }
)

export const fetchOrderbyUserAsync = createAsyncThunk(
  'Order/fetchOrderbyUser',
  async () => {
    const response = await fetchOrderbyUser()
    return response.data
  }
)

export const fetchOrdersByFilterAsync = createAsyncThunk(
  'Order/fetchOrdersByFilter',
  async ({Pagination,Sort}) => {
    const response = await fetchOrdersByFilter({Pagination,Sort})
    return response.data
  }
)


export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    resetCurrentOrder: (state)=>
    {
       state.CurrentOrder=null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.UserOrders.push(action.payload);
        state.CurrentOrder=action.payload;
      })
      .addCase(fetchUpdateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpdateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const newOrders=[...state.Orders]
        const index=newOrders.findIndex((order)=>order.id===action.payload.id)
        newOrders[index]=action.payload
        state.Orders=newOrders
      })
      .addCase(fetchOrderbyUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderbyUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.UserOrders=action.payload
      })
      .addCase(fetchOrdersByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Orders=action.payload.Orders
        state.total=action.payload.totalCount
      })
      
  },
});

export const {resetCurrentOrder} = OrderSlice.actions;


export const selectUserOrders = (state) => state.Order.UserOrders;
export const selectOrders = (state)=>state.Order.Orders
export const selectCurrentOrder = (state)=>state.Order.CurrentOrder;
export const selectOrdersCount = (state)=>state.Order.total
export const selectOrdersStatus = (state)=>state.Order.status

export default OrderSlice.reducer;
