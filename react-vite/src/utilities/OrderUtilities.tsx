import OrderItem from "../types/OrderItem.ts";

export function calculateOrderTotal(orderItems: OrderItem[]) {
  return orderItems.reduce((total: number, item: OrderItem) => {
    return total + item.quantity;
  }, 0);
}
