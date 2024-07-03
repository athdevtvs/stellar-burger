import { configureStore } from '@reduxjs/toolkit';
import {
  burgerConstructorSlice,
  addToConstructor,
  removeFromConstructor,
  reorderItemsWithinConstructor,
  clearConstructor,
  selectorConstructorItems,
  burgerConstructorInitialState as initialState
} from '@slices';
import { ingredients, bun } from '../test-data/mockData';
import {
  newBunItem,
  newBioPattyItem,
  newBurgerItem
} from '../test-data/mockData';
import {
  expectedBioPattyItemPayload,
  expectedBunItemPayload,
  expectedNewBurgerItem,
  expectedBurgerWithReorderedItems
} from '../test-data/expectedData';

describe('burger constructor slice', () => {
  describe('burger constructor reducer actions verification', () => {
    test('should return the initial state when passed an empty action', () => {
      const result = burgerConstructorSlice.reducer(undefined, {
        type: ''
      });

      expect(result).toEqual(initialState);
    });

    test('should returns an addToConstructor action object with prepared payload', () => {
      expect(addToConstructor(newBioPattyItem)).toEqual({
        type: 'burgerConstructor/addToConstructor',
        payload: expectedBioPattyItemPayload
      });
    });

    test('should add an ingredient to the empty constructor', () => {
      const newState = burgerConstructorSlice.reducer(
        undefined,
        addToConstructor(newBioPattyItem)
      );

      expect(newState.ingredients[0]).toEqual(expectedBioPattyItemPayload);
    });

    test('should add a bun to the empty constructor', () => {
      const newState = burgerConstructorSlice.reducer(
        initialState,
        addToConstructor(newBunItem)
      );

      expect(newState.bun).toEqual(expectedBunItemPayload);
    });

    test('should remove an item from the burger', () => {
      const newState = burgerConstructorSlice.reducer(
        { bun: newBurgerItem.bun, ingredients: newBurgerItem.ingredients },
        removeFromConstructor(newBurgerItem.ingredients[1].id)
      );

      expect(newState).toEqual(expectedNewBurgerItem);
    });

    test('should reorder items within the burger constructor', () => {
      const newState = burgerConstructorSlice.reducer(
        { bun: newBurgerItem.bun, ingredients: newBurgerItem.ingredients },
        reorderItemsWithinConstructor({ from: 0, to: 1 })
      );

      expect(newState).toEqual(expectedBurgerWithReorderedItems);
    });

    test('should clear burger constructor', () => {
      const newState = burgerConstructorSlice.reducer(
        { bun: newBurgerItem.bun, ingredients: newBurgerItem.ingredients },
        clearConstructor()
      );

      expect(newState).toEqual({ bun: null, ingredients: [] });
    });
  });

  describe('burger constructor selectors verification', () => {
    test('should select constructor items', () => {
      const anotherStore = configureStore({
        reducer: {
          burgerConstructor: burgerConstructorSlice.reducer
        },
        preloadedState: {
          burgerConstructor: {
            bun: bun,
            ingredients: ingredients
          }
        }
      });

      const selectConstructorItems = selectorConstructorItems(
        anotherStore.getState()
      );

      expect(selectConstructorItems).toEqual({
        bun: bun,
        ingredients: ingredients
      });
    });
  });
});
