import { FC, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { selectorIsAuthChecked, selectorUserData, getOrders } from '@slices';
import { Preloader } from '../ui/preloader';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectorIsAuthChecked);
  const user = useSelector(selectorUserData);

  /*const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  });*/

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }

  return children;
};
