import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

interface IOrdersState {
  orders: TOrder[];
  request: boolean;
}

const initialState: IOrdersState = {
  orders: [],
  request: false
};

export const getOrders = createAsyncThunk('order/get', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.request = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
  selectors: {
    selectorOrders: (state) => state.orders,
    selectorOrdersRequest: (state) => state.request
  }
});

export const { selectorOrders, selectorOrdersRequest } = ordersSlice.selectors;
export const { setOrderRequest } = ordersSlice.actions;
