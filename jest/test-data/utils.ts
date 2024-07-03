import { TOrder } from '@utils-types';

const currentDate = new Date();
const dateWithoutTime = currentDate.toISOString().split('T')[0];

export function filterOrdersByExpiration(arr: TOrder[]) {
  return arr.filter(({ createdAt }) => createdAt.includes(dateWithoutTime));
}
