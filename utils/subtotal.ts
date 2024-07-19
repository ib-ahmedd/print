import { CartItem } from "@types";

export function subtotal(array: CartItem[]): number {
  let subtotal = 0;

  array.forEach((item) => {
    subtotal = subtotal + item.price * item.quantity;
  });
  return subtotal;
}
