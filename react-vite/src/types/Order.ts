import OrderItemOld from "./OrderItemOld.ts";
import { Status } from "./Status";

interface Order {
  id: string;
  contact: string;
  customerID: number;
  email?: string;
  abn?: string;
  items: OrderItemOld[];
  date: Date;
  status: Status;
}

export default Order;
