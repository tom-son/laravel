import OrderItem from "./OrderItem";
import { Status } from "./Status";

interface Order {
  id: string;
  contact: string;
  customerID: number;
  email?: string;
  abn?: string;
  items: OrderItem[];
  date: Date;
  status: Status;
}

export default Order;
