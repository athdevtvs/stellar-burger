import '../../index.css';
import styles from './app.module.css';

import {
  ConstructorPage,
  NotFound404,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import { AppHeader, ProtectedRoute, Modal, OrderInfo } from '@components';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '@slices';

const App = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const handleCloseFeed = () => {};

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='/feed/:number' onClose={handleCloseFeed}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='/ingredients/:id' onClose={handleCloseFeed}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='/ingredients/:id' onClose={handleCloseFeed}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
