import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import OrderItem from "../types/OrderItem";
import { DatePicker } from "@mui/x-date-pickers";
import DescriptionSelectionField from "../components/fields/DescriptionSelectionField";
import moment from "moment";
import { useCustomerDescriptions } from "../hooks/customer";
import Description from "../types/Description";
import {formatToCurrency} from "../utilities/formatter";

interface OrderItemFormDialogProps {
  orderItem?: OrderItem;
  onClose: () => void;
  onDone: (order: OrderItem) => void;

  customerID: number;
}

function calculateOrderItemTotal(price: number, amount: number): number {
  return parseFloat((price * amount).toFixed(2));
}

function OrderItemFormDialog(props: OrderItemFormDialogProps) {
  const [date, setDate] = React.useState<Date>(
    props.orderItem?.date || new Date(),
  );
  const [descriptionID, setDescriptionID] = React.useState<number | undefined>(
    props.orderItem?.description || undefined,
  );
  const [rate, setRate] = React.useState<number>(props.orderItem?.rate || 0);
  const [loadTonnes, setLoadTonnes] = React.useState<number | string>(
    props.orderItem?.loadTonnes || "",
  );
  const [docketNumber, setDocketNumber] = React.useState<string>(
    props.orderItem?.docketNumber || "",
  );
  const [total, setTotal] = React.useState<number>(props.orderItem?.total || 0);

  const customerDescriptionsQuery = useCustomerDescriptions(props.customerID);

  function onDescriptionFieldChange(id: number) {
    setDescriptionID(id);

    const descriptionOption = customerDescriptionsQuery.data.find(
      (option: Description) => option.id === id,
    );
    if (descriptionOption === undefined) {
      console.error("Error: description not found for id: " + id);
      return;
    }

    setRate(descriptionOption.price);

    if (typeof loadTonnes === "number") {
      setTotal(calculateOrderItemTotal(descriptionOption.price, loadTonnes));
    }
  }

  function onLoadTonnesFieldChange(event: any) {
    const loadTonnes = parseFloat(event.target.value);
    if (isNaN(loadTonnes)) {
      setLoadTonnes(event.target.value);
      setTotal(0);

      return;
    }

    setLoadTonnes(loadTonnes);
    setTotal(calculateOrderItemTotal(rate, loadTonnes));
  }

  function onDone() {
    props.onDone({
      id: Date.now(),
      date,
      // TODO Thompson - there should be field validation instead
      description: descriptionID || 0,
      rate,
      // TODO Thompson - there should be field validation instead
      loadTonnes: typeof loadTonnes === "number" ? loadTonnes : 0,
      docketNumber,
      total,
    });
  }

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Order</DialogTitle>
      <DialogContent>
        <Stack margin={2} gap={2}>
          <DatePicker
            label="Date"
            onChange={(value) => {
              if (!value) {
                return;
              }

              setDate(value.toDate());
            }}
            value={moment(date)}
          />
          <TextField
            label="Docket #"
            type="text"
            margin="dense"
            onChange={(event) => setDocketNumber(event.target.value)}
            value={docketNumber}
          />
          <DescriptionSelectionField
            customerID={props.customerID}
            onChange={onDescriptionFieldChange}
            value={descriptionID}
          />

          <div>
            <FormControl sx={{ m: 1, width: "80px" }} variant="standard">
              <InputLabel htmlFor="rate-field">Rate</InputLabel>
              <Input
                id="rate-field"
                disabled={true}
                margin="dense"
                value={formatToCurrency(rate)}
              />
            </FormControl>
            <TextField
              label="Load (Tonnes)"
              type="number"
              margin="dense"
              onChange={onLoadTonnesFieldChange}
              value={loadTonnes}
              variant="standard"
            />
            <FormControl sx={{ m: 1, width: "180px" }} variant="standard">
              <InputLabel htmlFor="total-field">Total</InputLabel>
              <Input
                  id="total-field"
                  disabled={true}
                  margin="dense"
                  value={formatToCurrency(total)}
              />
            </FormControl>
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onDone}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderItemFormDialog;
