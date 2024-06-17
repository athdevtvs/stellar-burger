import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectorIngredients,
  selectorOrder,
  selectorRequest,
  clearOrder,
  selectorConstructorItems
} from '@slices';

export const BurgerConstructor: FC = () => {
  /** IN_PROGRESS: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();

  const constructorItems = useSelector(selectorConstructorItems);

  const orderRequest = useSelector(selectorRequest);
  const orderModalData = useSelector(selectorOrder);

  /*const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };*/

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
