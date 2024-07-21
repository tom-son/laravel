import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import Customer from "../types/Customer";
import CreateCustomerFormDialog from "./CreateCustomerFormDialog";
import {useCustomers} from "../hooks/customer";
import EditableDescriptionList from "./EditableDescriptionList";
import Description from "../types/Description";
import CustomersApi from "../api/CustomersApi";

function CustomersPage() {
  const customersQuery = useCustomers();

  const [formDialogVisibility, setFormDialogVisibility] = React.useState(false);

  async function saveCustomer(customer: Customer) {
    customersQuery.createNewCustomer(customer);
  }


  async function addCustomerDescription(customerID: number, description: Description) {
    await CustomersApi.addCustomerDescription(customerID, description as Description);
    await customersQuery.refetch();
  }

  async function deleteCustomerDescription(customerID: number, description: Description) {
    await CustomersApi.deleteCustomerDescription(customerID, description.id);
    await customersQuery.refetch();
  }

  const columns = [
    {
      field: "abn",
      headerName: "ABN",
      flex: 1,
    },
    {
      field: "businessName",
      headerName: "Business Name",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
  ];

  if (customersQuery.isError) {
    return <div>Error: {customersQuery.error.message}</div>;
  }



  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ padding: 4 }}>
        Customers
      </Typography>
      <Paper elevation={1} sx={{ marginBottom: 4, py: 3 }}>
        <Box
          sx={{
            mx: 2,
            my: 3,
          }}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={() => setFormDialogVisibility(true)}>
              Add Customer
            </Button>
          </div>

          <DataGridPro
            slots={{
              loadingOverlay: LinearProgress,
            }}
            loading={customersQuery.isFetching}
            rows={customersQuery.data || []}
            columns={columns}
            getDetailPanelContent={CustomerTableRowDetails}
            getDetailPanelHeight={() => "auto"}
          />

          {formDialogVisibility && (
            <CreateCustomerFormDialog
              onClose={() => setFormDialogVisibility(false)}
              onAdd={saveCustomer}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
}

interface CustomerTableRowDetailsProps {
  row: any
}
function CustomerTableRowDetails(props: CustomerTableRowDetailsProps) {
  return (
      <div>
        <Card sx={{ margin: 1 }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Email:
            </Typography>
            {props.row.email}
            <Typography variant="h6" component="div">
              Descriptions:
            </Typography>
            <EditableDescriptionList
                customerId={props.row.id}
            />
          </CardContent>
        </Card>
      </div>
  );
}

export default CustomersPage;
