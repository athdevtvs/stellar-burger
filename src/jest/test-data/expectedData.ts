import { TConstructorIngredient } from '@utils-types';
import {
  newBunItem,
  newCrispyMineralRingsItem,
  newBioPattyItem
} from './mockData';

export const expectedBioPattyItemPayload: TConstructorIngredient = {
  id: expect.any(String),
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const expectedCrispyMineralRingsItem: TConstructorIngredient = {
  id: expect.any(String),
  _id: '643d69a5c3f7b9001cfa0946',
  name: 'Хрустящие минеральные кольца',
  type: 'main',
  proteins: 808,
  fat: 689,
  carbohydrates: 609,
  calories: 986,
  price: 300,
  image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
  image_mobile:
    'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
};

export const expectedBunItemPayload: TConstructorIngredient = {
  id: expect.any(String),
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

//expectedBunItemPayload
export const expectedNewBurgerItem = {
  bun: expectedBunItemPayload,
  ingredients: [expectedBioPattyItemPayload]
};

export const expectedBurgerWithReorderedItems = {
  bun: expectedBunItemPayload,
  ingredients: [expectedCrispyMineralRingsItem, expectedBioPattyItemPayload]
};

export const expectedOrder = {
  _id: '667d0a7d856777001bb1e23e',
  ingredients: [newBioPattyItem, newCrispyMineralRingsItem, newBunItem],
  owner: '6671d51c856777001bb1bea6',
  status: 'done',
  name: 'Краторный минеральный био-марсианский бургер',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  number: 44774
};

/**
 * 
  name: 'Краторный минеральный био-марсианский бургер',
  number: 44432,
  status: 'done',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date)
 * 
 */
/*export const currentOrder = {
  data: {
    _id: '6683bb89856777001bb1f115',
    ingredients: [
      newBioPattyItem._id,
      newCrispyMineralRingsItem._id,
      newBunItem._id
    ],
    owner: '6671d51c856777001bb1bea6',
    status: 'done',
    name: 'Краторный минеральный био-марсианский бургер',
    createdAt: '2024-07-02T08:34:17.526Z',
    updatedAt: '2024-07-02T08:34:17.925Z',
    number: 44774
  },
  request: true
};*/
