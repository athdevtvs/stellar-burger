import { configureStore } from '@reduxjs/toolkit';
import {
  userSlice,
  authChecked,
  userLogout,
  registerUser,
  loginUser,
  checkUserAuth,
  getUser,
  logoutUser,
  updateUser,
  selectorUserData,
  selectorIsAuthChecked,
  selectorUserRequest,
  selectorLoginError,
  selectorRegisterError,
  selectorUpdateError,
  userInitialState as initialState
} from '@slices';
import { user, authedUser } from '../test-data/mockData';

describe('user slice', () => {
  describe('user reducer sync actions verification', () => {
    test('should return the initial state when passed an empty action', () => {
      const newState = userSlice.reducer(undefined, { type: '' });
      expect(newState).toEqual(initialState);
    });

    it('should set up auth checked', () => {
      const newState = userSlice.reducer(initialState, authChecked());
      expect(newState.isAuthChecked).toBe(true);
    });

    test('should logout', () => {
      const newState = userSlice.reducer(authedUser, userLogout());
      expect(newState.data).toBe(null);
    });
  });

  describe('user reducer async actions verification', () => {
    test('should pending the request for a register user operation', () => {
      const newState = userSlice.reducer(initialState, {
        type: registerUser.pending.type
      });

      expect(newState.request).toBe(true);
    });

    test('should rejected request for a register user operation', () => {
      const error = { message: 'Не удалось зарегистрироваться' };
      const newState = userSlice.reducer(initialState, {
        type: registerUser.rejected.type,
        error
      });

      expect(newState.request).toBe(false);
      expect(newState.registerError).toBe(error.message);
    });

    test('should register a user successfully', () => {
      const newState = userSlice.reducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: user
      });

      expect(newState.request).toBe(false);
      expect(newState.data).toEqual(user);
    });

    test('should pending the request for a login user operation', () => {
      const newState = userSlice.reducer(initialState, {
        type: loginUser.pending.type
      });

      expect(newState.request).toBe(true);
    });

    test('should rejected request for a login user operation', () => {
      const error = { message: 'Login Error Msg' };
      const newState = userSlice.reducer(initialState, {
        type: loginUser.rejected.type,
        error
      });

      expect(newState.request).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.loginError).toBe(error.message);
    });

    test('should login a user successfully', () => {
      const newState = userSlice.reducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: user
      });

      expect(newState.isAuthChecked).toBe(true);
      expect(newState.data).toEqual(user);
      expect(newState.request).toBe(false);
      expect(newState.loginError).toBe('');
    });

    test('should pending the request for a checking user authorization', () => {
      const newState = userSlice.reducer(initialState, {
        type: checkUserAuth.pending.type
      });

      expect(newState.loginError).toBe('');
      expect(newState.registerError).toBe('');
    });

    test('should get a user successfully', () => {
      const newState = userSlice.reducer(initialState, {
        type: getUser.fulfilled.type,
        payload: { success: true, user: user }
      });

      expect(newState.data).toBe(user);
    });

    test('should pending the request for a logout the user', () => {
      const newState = userSlice.reducer(initialState, {
        type: logoutUser.pending.type
      });

      expect(newState.request).toBe(true);
    });

    test('should rejected request for a logout the user', () => {
      const newState = userSlice.reducer(initialState, {
        type: logoutUser.rejected.type
      });

      expect(newState.request).toBe(false);
    });

    test('should logout the user successfully', () => {
      const newState = userSlice.reducer(initialState, {
        type: logoutUser.fulfilled.type
      });

      expect(newState.request).toBe(false);
      expect(newState.data).toBe(null);
    });

    test('should pending the request for updating the user', () => {
      const newState = userSlice.reducer(initialState, {
        type: updateUser.pending.type
      });

      expect(newState.request).toBe(true);
    });

    test('should rejected request for a updating the user', () => {
      const error = { message: 'Update Error Msg' };
      const newState = userSlice.reducer(initialState, {
        type: updateUser.rejected.type,
        error
      });

      expect(newState.request).toBe(false);
      expect(newState.updateError).toBe(error.message);
    });

    test('should update the user successfully', () => {
      const newState = userSlice.reducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: { success: true, user: updateUser }
      });

      expect(newState.request).toBe(false);
      expect(newState.data).toEqual(updateUser);
    });
  });

  describe('user selectors verification', () => {
    const preloadedState = {
      user: {
        data: user,
        isAuthChecked: true,
        request: true,
        loginError: 'Login Error Msg',
        registerError: 'Register Error Msg',
        updateError: 'Update Error Msg'
      }
    };
    let store = configureStore({ reducer: { user: userSlice.reducer } });

    beforeEach(() => {
      store = configureStore({
        reducer: { user: userSlice.reducer },
        preloadedState: preloadedState
      });
    });

    test('should select user data', () => {
      const selectUserData = selectorUserData(store.getState());
      expect(selectUserData).toBe(preloadedState.user.data);
    });

    test('should select user data', () => {
      const selectIsAuthChecked = selectorIsAuthChecked(store.getState());
      expect(selectIsAuthChecked).toBe(preloadedState.user.isAuthChecked);
    });

    test('should select user data', () => {
      const selectUserRequest = selectorUserRequest(store.getState());
      expect(selectUserRequest).toBe(preloadedState.user.request);
    });

    test('should select user data', () => {
      const selectLoginError = selectorLoginError(store.getState());
      expect(selectLoginError).toBe(preloadedState.user.loginError);
    });

    test('should select user data', () => {
      const selectRegisterError = selectorRegisterError(store.getState());
      expect(selectRegisterError).toBe(preloadedState.user.registerError);
    });

    test('should select user data', () => {
      const selectUpdateError = selectorUpdateError(store.getState());
      expect(selectUpdateError).toBe(preloadedState.user.updateError);
    });
  });
});
