import { rootReducer } from '../../src/services/store';
import {
  ingredientsSlice,
  orderSlice,
  burgerConstructorSlice,
  userSlice,
  ordersSlice,
  feedSlice
} from '@slices';

describe('rootReducer', () => {
  test('should initialize with the initial state when passed an empty action', () => {
    const itinialRootReducerState = {
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [ordersSlice.name]: ordersSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState()
    };

    expect(rootReducer(itinialRootReducerState, { type: '' })).toEqual(
      itinialRootReducerState
    );
  });
});
