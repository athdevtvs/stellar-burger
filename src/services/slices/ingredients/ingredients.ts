import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RequestStatus } from '@utils-constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type TIngredientState = {
  data: TIngredient[];
  isLoading: boolean;
  status: RequestStatus;
};

const initialState: TIngredientState = {
  data: [],
  isLoading: false,
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
    selectorIngredientsData: (state) => state.data,
    selectorIngredientsStatus: (state) => state.status,
    selectorIsLoading: (state) => state.isLoading
  }
});

export const selectorIngredients = ingredientsSlice.selectors;
//const { selectorIngredientsData, selectIsLoading } = ingredientsSlice.selectors;
