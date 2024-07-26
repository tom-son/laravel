import Order from "../types/Order";
import OrderItemOld from "../types/OrderItemOld.ts";
import { useState } from "react";
import { useCustomer } from "../hooks/customer";
import ErrorComponent from "../components/ErrorComponent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import OrderForm from "../orders/OrderForm";
import OrderItemFormDialog from "../orders/OrderItemFormDialog";
import { Status } from "../types/Status";
import PrintableContent from "../components/PrintableContent";
import InvoicePrintTemplate from "./InvoicePrintTemplate";

interface OrderFormDialogProps {
  order: Order;
  onClose: () => void;
  onSave: (newOrder: Order) => void;
}

function OrderFormDialog(props: OrderFormDialogProps) {
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const customerQuery = useCustomer(props.order.customerID);
  const [editOrderData, setEditOrderData] = useState<Order>(props.order);

  function onShowDialog() {
    setDialogVisibility(true);
  }

  function onAddOrderItem(orderItem: OrderItemOld) {
    setEditOrderData({
      ...editOrderData,
      items: [...editOrderData.items, orderItem],
    });

    setDialogVisibility(false);
  }

  function onOrderChange(event: any) {
    if (event.target.id === "items") {
      setEditOrderData({
        ...editOrderData,
        items: event.target.value as OrderItemOld[],
      });
    }

    // yes silly but it seems like mui select does not support id in event
    if (event.target.name === "status") {
      setEditOrderData({
        ...editOrderData,
        status: event.target.value,
      });
    }
  }

  function onSave() {
    props.onSave(editOrderData);
  }

  function onExportPDF() {
    window.print();
  }

  let body;
  if (customerQuery.isPending) {
    body = <>Loading...</>;
  }
  if (customerQuery.isError) {
    body = <ErrorComponent />;
  }

  if (customerQuery.data) {
    body = (
      <DialogContent>
        <Grid container sx={{ my: 2 }} gap={3}>
          <Grid item xs={3}>
            <TextField
              disabled={true}
              label="Company"
              value={customerQuery.data.businessName}
            />
          </Grid>
          <Grid item xs={2}>
            {/* padding for fields */}
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              disabled={true}
              label="Date"
              value={moment(editOrderData.date)}
            />
          </Grid>
          <Grid item xs={12}>
            <OrderForm
              customerID={customerQuery.data.id}
              order={editOrderData}
              readonly={true}
              onChange={onOrderChange}
            />
            <Button
              disabled={editOrderData.status === Status.paid}
              onClick={onShowDialog}
            >
              Add Order
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    );
  }

  return (
    <>
      <Dialog open={true} onClose={props.onClose} maxWidth="lg">
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>View Order - {editOrderData.id}</span>
            <div>
              <Button color="secondary" onClick={onExportPDF}>
                Save PDF
              </Button>
            </div>
          </div>
        </DialogTitle>

        {body}

        <DialogActions>
          <Button onClick={onSave}>Save</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {dialogVisibility && (
        <OrderItemFormDialog
          customerID={editOrderData.customerID}
          onDone={onAddOrderItem}
          onClose={() => setDialogVisibility(false)}
        />
      )}

      {/* This component has been updated to be editing. Move this Download button somewhere else after order has been saved */}
      <PrintableContent>
          <InvoicePrintTemplate order={editOrderData}/>
      </PrintableContent>
    </>
  );
}

export default OrderFormDialog;
