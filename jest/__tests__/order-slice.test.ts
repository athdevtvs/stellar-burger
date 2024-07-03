import { configureStore } from '@reduxjs/toolkit';
import {
  orderSlice,
  clearOrder,
  selectorOrder,
  selectorOrderRequest,
  orderBurger,
  getOrderByNumber,
  orderInitialState as initialState
} from '@slices';
import { newOrder, currentOrder } from '../test-data/mockData';

describe('order slice', () => {
  describe('order reducer sync actions verification', () => {
    test('should return the initial state when passed an empty action', () => {
      const result = orderSlice.reducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });

    test('should clear the order', () => {
      const newState = orderSlice.reducer(currentOrder, clearOrder());

      expect(newState.data).toBe(null);
    });
  });

  describe('order reducer async actions verification', () => {
    test('should pending the request for placing an order', async () => {
      const action = { type: orderBurger.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.request).toBe(true);
    });

    test('should place an order successfully', async () => {
      const action = { type: orderBurger.fulfilled.type, payload: newOrder };
      const newState = orderSlice.reducer(initialState, action);

      expect(newState.request).toBe(false);
      expect(newState.data).toEqual(newOrder.order);
    });

    test('should reject request for placing an order', async () => {
      const action = { type: orderBurger.rejected.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.request).toBe(false);
    });

    test('should pending the request for getting an order by number', async () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.request).toBe(true);
    });

    test('should get an order by number successfully', async () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [currentOrder] }
      };
      const newState = orderSlice.reducer(initialState, action);

      expect(newState.request).toBe(false);
      expect(newState.data).toEqual(currentOrder);
    });

    test('should reject request for getting an order by number', async () => {
      const action = { type: getOrderByNumber.rejected.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.request).toBe(false);
    });
  });

  describe('order selectors verification', () => {
    const preloadedState = {
      order: {
        data: currentOrder.data,
        request: false
      }
    };

    test('should select order', () => {
      const store = configureStore({
        reducer: { order: orderSlice.reducer },
        preloadedState: preloadedState
      });

      const selectOrder = selectorOrder(store.getState());

      expect(selectOrder).toEqual(preloadedState.order.data);
    });

    test('should select order request', () => {
      const store = configureStore({
        reducer: { order: orderSlice.reducer },
        preloadedState: preloadedState
      });

      const selectOrderRequest = selectorOrderRequest(store.getState());

      expect(selectOrderRequest).toBe(false);
    });
  });
});
