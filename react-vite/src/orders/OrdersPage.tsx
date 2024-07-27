import { useCallback, useEffect, useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import {GlobalState, INVOICES_PAGE_KEY} from "../App";
import CustomersApi from "../api/CustomersApi";
import CreateOrderForm from "./CreateOrderForm";
import Order from "../types/Order";
import Customer from "../types/Customer";
import { useOrders } from "../hooks/orders";

function OrdersPage(props: GlobalState) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>();

  const ordersQuery = useOrders();

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      const result = await CustomersApi.getCustomers();
      setCustomers(result);
    }

    fetchCustomers();
  }, []);
  const customerOptions = customers.map((customer) => ({
    id: customer.id,
    label: customer.businessName,
  }));

  const saveOrder = useCallback(
    (order: Order) => {
      ordersQuery.createNewOrder(order);

      setSelectedCustomerId(undefined);
      props.setSelectedPageKey(INVOICES_PAGE_KEY);
    },
    [ordersQuery, setSelectedCustomerId, props],
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ p: 4 }}>
        Create Invoice
      </Typography>
      <Paper elevation={1} sx={{ marginBottom: 4, py: 3 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
          <InputLabel id="customer-select-label">Customer</InputLabel>
          <Select
            labelId="customer-select-label"
            id="customer-select"
            value={selectedCustomerId}
            onChange={(event) => {
              if (!event.target.value) {
                setSelectedCustomerId(undefined);
                return;
              }

              setSelectedCustomerId(event.target.value as number);
            }}
            label="Customer"
          >
            <MenuItem value="">
              <em>Select customer</em>
            </MenuItem>
            {customerOptions.map((option) => (
              <MenuItem value={option.id}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCustomerId && (
          <CreateOrderForm customerID={selectedCustomerId} saveOrder={saveOrder} />
        )}
      </Paper>
    </Container>
  );
}

export default OrdersPage;
