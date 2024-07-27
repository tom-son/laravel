import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import Customer from "../types/Customer";
import { useCreateCustomer } from "../hooks/customer.tsx";

interface CreateCustomerFormDialogProps {
  onClose: () => void;
  onAdd: (newCustomer: Customer) => void;
}

function CreateCustomerFormDialog(props: CreateCustomerFormDialogProps) {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [abn, setAbn] = useState("");
  const [email, setEmail] = useState("");

  const customerCreateMutator = useCreateCustomer();

  async function onSave() {
    const customer = {
      name,
      businessName,
      abn,
      email,
    } as Customer;
    customerCreateMutator.mutate(customer);

    props.onClose();
  }

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Create Customer</DialogTitle>
      <DialogContent>
        <Stack margin={2} gap={2}>
          <TextField
            label="Name"
            type="text"
            margin="dense"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <TextField
            label="Business Name"
            type="text"
            margin="dense"
            onChange={(event) => setBusinessName(event.target.value)}
            value={businessName}
          />
          <TextField
            label="ABN"
            type="text"
            margin="dense"
            onChange={(event) => setAbn(event.target.value)}
            value={abn}
          />
          <TextField
            label="E-mail"
            type="text"
            margin="dense"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCustomerFormDialog;
