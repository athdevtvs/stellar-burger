import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi
} from '@api';
import { setCookie, getCookie, deleteCookie } from '../../../utils/cookie';

type UserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  request: boolean;
  loginError: string;
  registerError: string;
  updateError: string;
};

export const initialState: UserState = {
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
>('user/register', async (userData: TRegisterData, { rejectWithValue }) => {
  const data = await registerUserApi(userData);
  if (!data?.success) {
    return rejectWithValue(data);
  }
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.user;
});

export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string }
>('user/loginUser', async (userData: TLoginData, { rejectWithValue }) => {
  const data = await loginUserApi(userData);
  if (!data?.success) {
    return rejectWithValue(data);
  }
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.user;
});

export const getUser = createAsyncThunk('user/get', getUserApi);

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
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) =>
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    })
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (newUserData: Partial<TRegisterData>) => updateUserApi(newUserData)
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
      })
      .addCase(logoutUser.pending, (state) => {
        state.request = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.request = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.request = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.request = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.request = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.request = false;
        state.updateError = action.error.message || '';
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
