import { nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';
import { TBurgerConstructorState } from '@slices';

export const newBioPattyItem: TIngredient = {
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

export const newCrispyMineralRingsItem: TIngredient = {
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

export const newBunItem: TIngredient = {
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
} as const;

const newConstructorBunItem: TConstructorIngredient = Object.assign(
  { id: nanoid() },
  ...Object.entries(newBunItem).map(([key, value]) => ({ [key]: value }))
);

const newConstructorBioPattyItem: TConstructorIngredient = Object.assign(
  { id: nanoid() },
  ...Object.entries(newBioPattyItem).map(([key, value]) => ({ [key]: value }))
);

const newConstructorCrispyMineralRingsItem: TConstructorIngredient =
  Object.assign(
    { id: nanoid() },
    ...Object.entries(newCrispyMineralRingsItem).map(([key, value]) => ({
      [key]: value
    }))
  );

export const newBurgerItem: TBurgerConstructorState = {
  bun: newConstructorBunItem,
  ingredients: [
    newConstructorBioPattyItem,
    newConstructorCrispyMineralRingsItem
  ]
};

export const ingredients: Array<TConstructorIngredient> = [
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  },
  {
    id: nanoid(),
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
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0948',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
  },
  {
    id: nanoid(),
    _id: '643d69a5c3f7b9001cfa094a',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png'
  }
];

export const bun: TConstructorIngredient = {
  id: nanoid(),
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

export const allOrders: TOrder[] = [
  {
    _id: '667d0a7d856777001bb1e23e',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0946'
    ],
    name: 'Краторный минеральный био-марсианский бургер',
    number: 44432,
    status: 'done',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '667ce7a3856777001bb1e215',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    name: 'Флюоресцентный люминесцентный бургер',
    number: 44431,
    status: 'done',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '667cdfea856777001bb1e205',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093d'
    ],
    name: 'Флюоресцентный био-марсианский бессмертный бургер',
    number: 44430,
    status: 'done',
    createdAt: '2024-04-27T03:43:38.869Z',
    updatedAt: '2024-04-27T03:43:39.242Z'
  }
];

export const newOrder = {
  success: true,
  name: 'Краторный минеральный био-марсианский бургер',
  order: {
    ingredients: [newBioPattyItem, newCrispyMineralRingsItem, newBunItem],
    _id: '66805e72856777001bb1eadc',
    owner: {
      name: 'TVs',
      email: 'vaganova.tanya@gmail.com',
      createdAt: '2024-06-18T18:42:36.010Z',
      updatedAt: '2024-06-20T20:59:27.194Z'
    },
    status: 'done',
    name: 'Краторный минеральный био-марсианский бургер',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 44774,
    price: 1979
  }
};

export const currentOrder = {
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
};

export const user = {
  email: 'test@test.com',
  name: 'test'
};

export const authedUser = {
  data: user,
  isAuthChecked: true,
  request: false,
  loginError: '',
  registerError: '',
  updateError: ''
};
