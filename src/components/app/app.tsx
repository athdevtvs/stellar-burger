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
import {
  AppHeader,
  ProtectedRoute,
  Modal,
  OrderInfo,
  IngredientDetails
} from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredients, checkUserAuth, clearOrder, getFeed } from '@slices';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderId = location.pathname.split('/').at(3);
  const feedId = location.pathname.split('/').at(2);

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
    dispatch(getFeed());
  }, []);

  const handleCloseFeed = () => {
    navigate('./feed');
    dispatch(clearOrder());
  };

  const handleCloseProfileOrderModal = () => {
    navigate('./profile/orders');
    dispatch(clearOrder());
  };

  const handleCloseIngridients = () => {
    navigate('/');
    dispatch(clearOrder());
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
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
              <div className={styles.detailPageWrap}>
                <h3 className={`${styles.title} text text_type_main-large`}>
                  {`#${feedId?.padStart(6, '0')}`}
                </h3>
                <OrderInfo />
              </div>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <div className={styles.detailPageWrap}>
                <h3 className={`${styles.title} text text_type_main-large`}>
                  Детали ингридиента
                </h3>
                <IngredientDetails />
              </div>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <div className={styles.detailPageWrap}>
                <h3 className={`${styles.title} text text_type_main-large`}>
                  {`#${orderId?.padStart(6, '0')}`}
                </h3>
                <OrderInfo />
              </div>
            }
          />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={`#${feedId?.padStart(6, '0')}`}
                  onClose={handleCloseFeed}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингридиента'
                  onClose={handleCloseIngridients}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title={`#${orderId?.padStart(6, '0')}`}
                    onClose={handleCloseProfileOrderModal}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
