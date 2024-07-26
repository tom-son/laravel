import Order from "../types/Order";
import OrderItemOld from "../types/OrderItemOld.ts";
import requestHandler from "./requestHandler";
import { Status } from "../types/Status";

class OrdersApi {
  private static async getOrdersFromDB(): Promise<Order[]> {
    const result = await requestHandler.get("/invoices");

    return result.data.Items;
  }

  public static async getOrders(): Promise<Order[]> {
    // return OrdersApi.getOrdersFromLocalStorage();
    return await OrdersApi.getOrdersFromDB();
  }

  public static async createOrder(newOrder: Order): Promise<boolean> {
    try {
      await requestHandler.post("/invoices", newOrder);
    } catch (error) {
      console.error(error);
      // TODO Thompson - make this endpoint have parameter validation. Currently this catch does not work.
      // since lambda api gateway will still throw 200 even if it errors out.
      return false;
    }

    return true;
  }

  public static async updateOrder(
    orderID: string,
    orderItems: OrderItemOld[],
    status: Status,
  ): Promise<boolean> {
    try {
      await requestHandler.put(`/invoices/${orderID}/orders`, {
        status: status,
        orderItems: orderItems,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default OrdersApi;
