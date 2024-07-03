import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedState = {
  orders: TOrder[];
  totalData: {
    total: number;
    totalToday: number;
  };
};

export const initialState: TFeedState = {
  orders: [],
  totalData: {
    total: 0,
    totalToday: 0
  }
};

export const getFeed = createAsyncThunk(
  'feed/getAll',
  async (_, { dispatch }) => {
    dispatch(clearFeed());
    return getFeedsApi();
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.totalData.total = action.payload.total;
      state.totalData.totalToday = action.payload.totalToday;
    });
  },
  selectors: {
    selectorFeed: (state) => state,
    selectorFeedOrders: (state) => state.orders,
    selectorTotalData: (state) => state.totalData
  }
});

export const { clearFeed } = feedSlice.actions;
export const { selectorFeed, selectorFeedOrders, selectorTotalData } =
  feedSlice.selectors;
