import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectorIngredients } from '@slices';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useSelector(
    selectorIngredients.selectorIngredientsData
  ).find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
