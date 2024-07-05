import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

type TOrderState = {
  data: TOrder | null;
  request: boolean;
};

export const initialState: TOrderState = {
  data: null,
  request: false
};

export const orderBurger = createAsyncThunk(
  'order/post',
  async (dataId: string[], { dispatch }) => {
    dispatch(clearOrder());
    return orderBurgerApi(dataId);
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number, { dispatch }) => {
    dispatch(clearOrder());
    return getOrderByNumberApi(orderNumber);
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.request = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.data = action.payload.order;
        state.request = false;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.request = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.request = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.data = action.payload.orders[0];
        state.request = false;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.request = false;
      });
  },
  selectors: {
    selectorOrder: (state) => state.data,
    selectorOrderRequest: (state) => state.request
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectorOrder, selectorOrderRequest } = orderSlice.selectors;
