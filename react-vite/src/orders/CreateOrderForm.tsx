import React, { useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import OrderForm from "./OrderForm";
import OrderItemFormDialog from "./OrderItemFormDialog";
import Order from "../types/Order";
import OrderItemOld from "../types/OrderItemOld.ts";
import { useCustomer } from "../hooks/customer";
import Customer from "../types/Customer";
import { Status } from "../types/Status";

function createNewInitialOrder(customer: Customer): Order {
  return {
    customerID: customer.id,
    id: Date.now().toString(),
    date: new Date(),
    contact: customer.name,
    abn: customer.abn || "",
    email: customer.email || "",
    items: [],
    status: Status.new,
  };
}

interface CreateOrderFormProps {
  customerID: number;
  saveOrder: (order: Order) => void;
}

function CreateOrderForm(props: CreateOrderFormProps) {
  const [order, setOrder] = React.useState<Order | null>(null);
  const [formDialogVisibility, setFormDialogVisibility] = React.useState(false);

  const customerQuery = useCustomer(props.customerID);

  useEffect(() => {
    if (customerQuery.data) {
      setOrder(createNewInitialOrder(customerQuery.data));
    }
  }, [props.customerID]);

  function addOrderItem(orderItem: OrderItemOld) {
    if (!order) {
      return;
    }

    setOrder({
      ...order,
      items: [...order.items, orderItem],
    } as Order);

    setFormDialogVisibility(false);
  }

  function onSaveOrder() {
    if (!order) {
      return;
    }

    props.saveOrder(order);
  }

  function onOrderChange(event: React.ChangeEvent<HTMLInputElement>) {
    setOrder({
      ...order,
      [event.target.id]: event.target.value,
    } as Order);
  }

  return (
    <Box
      sx={{
        mx: 2,
        my: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {order && (
            <OrderForm
              newForm={true}
              customerID={props.customerID}
              onChange={onOrderChange}
              order={order}
              readonly={true}
            />
          )}
          <Button onClick={() => setFormDialogVisibility(true)}>
            Add to Order
          </Button>
          {formDialogVisibility && (
            <OrderItemFormDialog
              onDone={addOrderItem}
              onClose={() => setFormDialogVisibility(false)}
              customerID={props.customerID}
            />
          )}
        </Grid>
        <Grid item xs={10}>
          {/* right padding for button */}
        </Grid>
        <Grid item xs={2}>
          <Button onClick={onSaveOrder}>Save Order</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateOrderForm;
