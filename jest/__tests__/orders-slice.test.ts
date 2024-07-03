import { configureStore } from '@reduxjs/toolkit';
import {
  ordersSlice,
  setOrderRequest,
  selectorOrders,
  selectorOrdersRequest,
  getOrders,
  ordersInitialState as initialState
} from '@slices';
import { allOrders } from '../test-data/mockData';

describe('orders slice', () => {
  describe('orders reducer sync actions verification', () => {
    test('should return the initial state when passed an empty action', () => {
      const result = ordersSlice.reducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });

    test('should set order request', () => {
      const newState = ordersSlice.reducer(initialState, setOrderRequest(true));

      expect(newState.request).toBe(true);
    });
  });

  describe('orders reducer async actions verification', () => {
    test('should get the orders', async () => {
      const action = { type: getOrders.fulfilled.type, payload: allOrders };
      const state = ordersSlice.reducer(initialState, action);

      expect(state.orders).toEqual(allOrders);
    });
  });

  describe('orders selectors verification', () => {
    const preloadedState = {
      orders: {
        orders: allOrders,
        request: false
      }
    };

    test('should select orders', () => {
      const store = configureStore({
        reducer: { orders: ordersSlice.reducer },
        preloadedState: preloadedState
      });

      const selectOrders = selectorOrders(store.getState());

      expect(selectOrders).toEqual(preloadedState.orders.orders);
    });

    test('should select orders request', () => {
      const store = configureStore({
        reducer: { orders: ordersSlice.reducer },
        preloadedState: preloadedState
      });

      const selectOrderRequest = selectorOrdersRequest(store.getState());

      expect(selectOrderRequest).toBe(false);
    });
  });
});
