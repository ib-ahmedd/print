import { CartItem } from "@types";

export function subtotal(array: CartItem[]): number {
  let total = 0;

  array.forEach((item) => {
    total = total + item.price * item.quantity;
  });
  return total;
}

export function itemsCount(array: CartItem[]): number {
  let items = 0;
  array.forEach((item) => {
    items = items + item.quantity;
  });

  return items;
}
