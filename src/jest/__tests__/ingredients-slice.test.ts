import { configureStore } from '@reduxjs/toolkit';
import { RequestStatus } from '@utils-constants';
import {
  ingredientsSlice,
  getIngredients,
  ingredientsInitialState as initialState,
  selectorIngredientsData,
  selectorIngredientsStatus,
  selectorIsLoading
} from '@slices';
import {
  newBunItem,
  newBioPattyItem,
  newCrispyMineralRingsItem
} from '../test-data/mockData';

const mockIngredients = [
  newBunItem,
  newBioPattyItem,
  newCrispyMineralRingsItem
];

describe('ingredients slice', () => {
  describe('ingredients reducer sync actions verification', () => {
    test('should return the initial state when passed an empty action', () => {
      const actual = ingredientsSlice.reducer(undefined, { type: '' });

      expect(actual).toEqual(initialState);
    });
  });

  describe('ingredients reducer async actions verification', () => {
    test('should return a loading status when passed a pending action', () => {
      const action = getIngredients.pending('', undefined, {});
      const actual = ingredientsSlice.reducer(initialState, action);

      expect(actual.status).toBe(RequestStatus.Loading);
    });

    test('should return a failed status when passed a rejected action', async () => {
      const action = getIngredients.rejected(null, '');
      const actual = ingredientsSlice.reducer(initialState, action);

      expect(actual.status).toEqual(RequestStatus.Failed);
    });

    test('should return a success status with data when passed a fulfilled action', async () => {
      const action = getIngredients.fulfilled(mockIngredients, '', undefined);
      const actual = ingredientsSlice.reducer(initialState, action);

      expect(actual.status).toEqual(RequestStatus.Success);
      expect(actual.data).toEqual(mockIngredients);
    });
  });

  describe('ingredients selectors verification', () => {
    const preloadedState = {
      ingredients: {
        data: mockIngredients,
        isLoading: false,
        status: RequestStatus.Idle
      }
    };

    test('should select ingredients data', () => {
      const store = configureStore({
        reducer: { ingredients: ingredientsSlice.reducer },
        preloadedState: preloadedState
      });

      const selectIngredients = selectorIngredientsData(store.getState());

      expect(selectIngredients).toEqual(preloadedState.ingredients.data);
    });

    test('should select ingredients status', () => {
      const store = configureStore({
        reducer: { ingredients: ingredientsSlice.reducer },
        preloadedState: preloadedState
      });

      const selectIngredientsStatus = selectorIngredientsStatus(
        store.getState()
      );

      expect(selectIngredientsStatus.valueOf()).toEqual(
        preloadedState.ingredients.status
      );
    });

    test('should select isLoading state', () => {
      const store = configureStore({
        reducer: { ingredients: ingredientsSlice.reducer },
        preloadedState: preloadedState
      });

      const selectIsLoading = selectorIsLoading(store.getState());

      expect(selectIsLoading.valueOf()).toEqual(
        preloadedState.ingredients.isLoading
      );
    });
  });
});
