import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectorIngredients,
  selectorOrder,
  selectorOrderRequest,
  selectorConstructorItems,
  orderBurger,
  clearOrder,
  selectorUserData,
  clearConstructor
} from '@slices';

export const BurgerConstructor: FC = () => {
  /** IN_PROGRESS: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectorConstructorItems);
  const orderRequest = useSelector(selectorOrderRequest);
  const orderModalData = useSelector(selectorOrder);
  const user = useSelector(selectorUserData);
  /*const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };*/

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
    dispatch(orderBurger(ingredientIds)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
