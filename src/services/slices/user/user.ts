import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  getUserApi
} from '@api';
import { setCookie, getCookie } from '../../../utils/cookie';
//import { registerUser, loginUser } from '@slices';

type UserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  request: boolean;
  loginError: string;
  registerError: string;
  updateError: string;
};

const initialState: UserState = {
  data: null,
  isAuthChecked: false,
  request: false,
  loginError: '',
  registerError: '',
  updateError: ''
};

export const registerUser = createAsyncThunk<
  TUser,
  { name: string; email: string; password: string }
>('user/register', async (user) => {
  const data = await registerUserApi(user);
  return data.user;
});

export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string }
>('user/loginUser', async (user) => {
  const data = await loginUserApi(user);
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.user;
});

const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
    dispatch(authChecked());
    }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.request = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.registerError = action.error.message || '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.request = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.request = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.request = false;
        state.loginError = action.error.message || '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthChecked = true;
        state.request = false;
        state.loginError = '';
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loginError = '';
        state.registerError = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      });
  },
  selectors: {
    selectorUserData: (state) => state.data,
    selectorIsAuthChecked: (state) => state.isAuthChecked,
    selectorUserRequest: (state) => state.request,
    selectorLoginError: (state) => state.loginError,
    selectorRegisterError: (state) => state.registerError,
    selectorUpdateError: (state) => state.updateError
  }
});

export const { authChecked, userLogout } = userSlice.actions;
export const {
  selectorUserData,
  selectorIsAuthChecked,
  selectorUserRequest,
  selectorLoginError,
  selectorRegisterError,
  selectorUpdateError
} = userSlice.selectors;
