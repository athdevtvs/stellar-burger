import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectorOrders, selectorUserData, getOrders } from '@slices';

export const ProfileOrders: FC = () => {
  /** DONE: взять переменную из стора */
  const user = useSelector(selectorUserData);
  const orders: TOrder[] = useSelector(selectorOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
