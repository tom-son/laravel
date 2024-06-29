import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { GlobalState, INVOICES_PAGE_KEY } from "../App";
import CustomersApi from "../api/CustomersApi";
import CreateOrderForm from "./CreateOrderForm";
import Order from "../types/Order";
import Customer from "../types/Customer";
import { useOrders } from "../hooks/orders";

function OrdersPage(props: GlobalState) {
  const ordersQuery = useOrders();

  const customerID = useMemo(
    () => props.selectedCustomerID,
    [props.selectedCustomerID],
  );

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

  const { setSelectedCustomerID, setSelectedPageKey } = props;
  const saveOrder = useCallback(
    (order: Order) => {
      ordersQuery.createNewOrder(order);

      setSelectedCustomerID(null);
      setSelectedPageKey(INVOICES_PAGE_KEY);
    },
    [ordersQuery, setSelectedCustomerID, setSelectedPageKey],
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
            value={customerID}
            onChange={(event) => {
              if (!event.target.value) {
                props.setSelectedCustomerID(null);
                return;
              }

              props.setSelectedCustomerID(event.target.value as number);
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

        {customerID && (
          <CreateOrderForm customerID={customerID} saveOrder={saveOrder} />
        )}
      </Paper>
    </Container>
  );
}

export default OrdersPage;
