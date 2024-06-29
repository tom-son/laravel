import OrderItem from "../types/OrderItem";

export function calculateOrderTotal(orderItems: OrderItem[]) {
  return orderItems.reduce((total: number, item: OrderItem) => {
    return total + item.total;
  }, 0);
}
