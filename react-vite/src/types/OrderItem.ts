interface OrderItem {
  id: number;
  invoiceId: number;
  routeId: number;
  quantity: number;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

export default OrderItem;
