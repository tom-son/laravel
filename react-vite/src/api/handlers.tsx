import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

class Handlers {
  public static readonly CUSTOMERS_KEY = "customers";
  public static readonly ORDERS_KEY = "orders";
  public static readonly ORDER_KEY = "order";
}

export default Handlers;
