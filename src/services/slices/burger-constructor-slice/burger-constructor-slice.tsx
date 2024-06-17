import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      }
    },
    removeFromConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    reorderItemsWithinConstructor: (state, action) => {
      const { from, to } = action.payload;
      state.ingredients[from] = state.ingredients.splice(
        to,
        1,
        state.ingredients[from]
      )[0];
    }
  },
  selectors: {
    selectorConstructorItems: (state) => state
  }
});

export const { selectorConstructorItems } = burgerConstructorSlice.selectors;
export const {
  addToConstructor,
  removeFromConstructor,
  reorderItemsWithinConstructor
} = burgerConstructorSlice.actions;
