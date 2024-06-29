import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DataGridPremium,
  GRID_AGGREGATION_ROOT_FOOTER_ROW_ID,
  GridActionsCellItem,
} from "@mui/x-data-grid-premium";
import { orderColumns } from "./orderConstants";
import React, { useState } from "react";
import Order from "../types/Order";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import OrderItemFormDialog from "./OrderItemFormDialog";
import OrderItem from "../types/OrderItem";
import { Status } from "../types/Status";

interface OrderFormProps {
  customerID: number;
  order: Order;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  newForm?: boolean;
}

function OrderForm(props: OrderFormProps) {
  const [orderItemIDSelected, setOrderItemIDSelected] = useState<number | null>(
    null,
  );

  const columns = [...orderColumns];

  if (props.onChange) {
    columns.push({
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params: any) => {
        if (params.id === GRID_AGGREGATION_ROOT_FOOTER_ROW_ID) {
          return [];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => openEditOrderItemDialog(params.id as number)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteRow(params.id as number)}
            color="inherit"
          />,
        ];
      },
    });
  }

  const rows = [
    ...props.order.items.map((item) => ({
      ...item,
      customerID: props.order.customerID,
    })),
  ];

  function openEditOrderItemDialog(rowID: number) {
    setOrderItemIDSelected(rowID);
  }

  function onUpdateRow(newOrderItem: OrderItem) {
    const orderItemIndex = props.order.items.findIndex(
      (item) => item.id === orderItemIDSelected,
    );
    const newOrderItems = [...props.order.items];
    newOrderItems.splice(orderItemIndex, 1, newOrderItem);

    props.onChange &&
      props.onChange({
        target: {
          id: "items",
          value: newOrderItems,
        },
      } as any);
    setOrderItemIDSelected(null);
  }

  function onDeleteRow(rowID: number) {
    props.onChange &&
      props.onChange({
        target: {
          id: "items",
          value: props.order.items.filter((item) => item.id !== rowID),
        },
      } as any);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="status-field-label">Status</InputLabel>
            <Select
              disabled={props.newForm}
              labelId="status-field-label"
              name="status"
              value={props.order.status}
              label="Status"
              onChange={props.onChange as any}
            >
              <MenuItem value={Status.new}>New</MenuItem>
              <MenuItem value={Status.invoiceSent}>Invoice sent</MenuItem>
              <MenuItem value={Status.paid}>Paid</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          {/* filler grid */}
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="contact"
            disabled={props.readonly}
            label="Contact"
            fullWidth={true}
            onChange={props.onChange}
            value={props.order.contact}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="email"
            disabled={props.readonly}
            label="E-mail"
            fullWidth={true}
            onChange={props.onChange}
            value={props.order.email}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="abn"
            disabled={props.readonly}
            label="ABN"
            fullWidth={true}
            onChange={props.onChange}
            value={props.order.abn}
          />
        </Grid>
        <Grid item xs={12}>
          <DataGridPremium
            autoHeight
            rows={rows}
            columns={columns}
            hideFooterPagination={true}
            initialState={{
              aggregation: {
                model: {
                  total: "sum",
                },
              },
            }}
          />
        </Grid>
      </Grid>
      {orderItemIDSelected && (
        <OrderItemFormDialog
          orderItem={props.order.items.find(
            (item) => item.id === orderItemIDSelected,
          )}
          onDone={onUpdateRow}
          onClose={() => setOrderItemIDSelected(null)}
          customerID={props.customerID}
        />
      )}
    </>
  );
}

export default OrderForm;
