import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsSlice,
  orderSlice,
  burgerConstructorSlice,
  userSlice,
  ordersSlice,
  feedSlice
} from '@slices';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [feedSlice.name]: feedSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
