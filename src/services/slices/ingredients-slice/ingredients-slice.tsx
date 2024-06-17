import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RequestStatus } from '@utils-constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type TIngredientState = {
  data: TIngredient[];
  status: RequestStatus;
};

const initialState: TIngredientState = {
  data: [],
  status: RequestStatus.Idle
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorIngredientsData: (state: TIngredientState) => state.data,
    selectorIngredientsStatus: (state: TIngredientState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;
