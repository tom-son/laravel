import { useMutation, useQuery } from "@tanstack/react-query";
import Handlers, { queryClient } from "../api/handlers";
import OrdersApi from "../api/OrdersApi";
import Order from "../types/Order";
import { DefaultError } from "@tanstack/query-core/build/modern/index";

export function useOrders() {
  const customerQuery = useQuery({
    queryKey: [Handlers.ORDERS_KEY],
    queryFn: OrdersApi.getOrders,
    staleTime: 120000,
  });

  const orderCreateMutation = useMutation({
    mutationFn: OrdersApi.createOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [Handlers.ORDERS_KEY] });
    },
  });
  function createNewOrder(order: Order) {
    orderCreateMutation.mutate(order);
  }

  return {
    ...customerQuery,
    createNewOrder,
  };
}

export function useOrder() {
  const orderItemsMutation = useMutation<boolean, DefaultError, Order>({
    mutationFn: (order: Order) =>
      OrdersApi.updateOrder(order.id, order.items, order.status),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [Handlers.ORDERS_KEY] });
    },
  });

  function updateOrder(order: Order) {
    orderItemsMutation.mutate(order);
  }

  return { updateOrder };
}
