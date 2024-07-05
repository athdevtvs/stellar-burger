import { configureStore } from '@reduxjs/toolkit';
import {
  feedSlice,
  clearFeed,
  selectorFeed,
  selectorFeedOrders,
  selectorTotalData,
  getFeed,
  feedInitialState as initialState
} from '@slices';
import { allOrders } from '../test-data/mockData';
import { filterOrdersByExpiration } from '../test-data/utils';

const preloadedState = {
  feed: {
    orders: allOrders,
    totalData: {
      total: allOrders.length,
      totalToday: filterOrdersByExpiration(allOrders).length
    }
  }
};

describe('feed slice', () => {
  describe('feed reducer sync actions verification', () => {
    test('should return the initial state when passed an empty action', () => {
      const result = feedSlice.reducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });

    test('should clear the feed', () => {
      const newState = feedSlice.reducer(preloadedState.feed, clearFeed());

      expect(newState).toEqual(initialState);
    });
  });

  describe('feed reducer async actions verification', () => {
    test('should get the feed', async () => {
      const payload = {
        orders: allOrders,
        total: allOrders.length,
        totalToday: filterOrdersByExpiration(allOrders).length
      };

      const action = { type: getFeed.fulfilled.type, payload };
      const state = feedSlice.reducer(initialState, action);

      expect(state.orders).toEqual(payload.orders);
      expect(state.totalData.total).toEqual(payload.total);
      expect(state.totalData.totalToday).toEqual(payload.totalToday);
    });
  });

  describe('feed selectors verification', () => {
    test('should select feed', () => {
      const store = configureStore({
        reducer: { feed: feedSlice.reducer },
        preloadedState: preloadedState
      });

      const selectFeed = selectorFeed(store.getState());

      expect(selectFeed).toEqual(preloadedState.feed);
    });

    test('should select feed orders', () => {
      const store = configureStore({
        reducer: { feed: feedSlice.reducer },
        preloadedState: preloadedState
      });

      const selectFeedOrders = selectorFeedOrders(store.getState());

      expect(selectFeedOrders).toEqual(allOrders);
    });

    test('should select total data', () => {
      const store = configureStore({
        reducer: { feed: feedSlice.reducer },
        preloadedState: preloadedState
      });

      const selectTotalData = selectorTotalData(store.getState());

      expect(selectTotalData).toEqual(preloadedState.feed.totalData);
    });
  });
});
