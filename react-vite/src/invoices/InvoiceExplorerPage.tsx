import React from "react";
import { CREATE_INVOICE_PAGE_KEY, GlobalState } from "../App";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import { GridRowSelectionModel } from "@mui/x-data-grid/models/gridRowSelectionModel";
// import { useCustomer } from "../hooks/customer";
// import { calculateOrderTotal } from "../utilities/OrderUtilities";
import { formatDateFull } from "../utilities/formatter";
import OrderFormDialog from "./OrderFormDialog";
import Order from "../types/Order";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GradeIcon from "@mui/icons-material/Grade";
import DescriptionIcon from "@mui/icons-material/Description";
import { Status } from "../types/Status";
import { yellow } from "@mui/material/colors";
import {useInvoices} from "../hooks/invoice.tsx";

// function CustomerName(props: { customerID: number }) {
//   const customerQuery = useCustomer(props.customerID);
//   if (customerQuery.isPending) {
//     return null;
//   }
//
//   return <>{customerQuery?.data.businessName}</>;
// }

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    type: "string",
    flex: 1,
    minWidth: 130,
    maxWidth: 140,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    maxWidth: 130,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, string>) => {
      if (params.value === Status.paid) {
        return (
          <Tooltip title={params.value}>
            <>
              <CheckCircleIcon color="success" />
              <span> {params.value}</span>
            </>
          </Tooltip>
        );
      } else if (params.value === Status.new) {
        return (
          <Tooltip title={params.value}>
            <>
              <GradeIcon sx={{ color: yellow[500] }} />
              <span> {params.value}</span>
            </>
          </Tooltip>
        );
      } else if (params.value === Status.invoiceSent) {
        return (
          <Tooltip title={params.value}>
            <>
              <DescriptionIcon color="info" />
              <span> {params.value}</span>
            </>
          </Tooltip>
        );
      } else {
        return <>{params.value} </>;
      }
    },
  },
  {
    field: "date",
    type: "date",
    headerName: "Date",
    flex: 1,
    minWidth: 100,
    maxWidth: 110,
    valueGetter: (params) => {
      return new Date(params.value);
    },
    valueFormatter: (params) => {
      return formatDateFull(params.value);
    },
  },
  {
    field: "customerId",
    headerName: "Company",
    type: "string",
    flex: 2,
    minWidth: 180,
    renderCell: (params: GridRenderCellParams<any, string>) => {
      return params.row.customerID;
      // return <CustomerName customerID={params.row.customerID} />;
    },
  },
  {
    field: "contact",
    headerName: "Contact",
    type: "string",
    flex: 2,
    minWidth: 150,
  },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    flex: 1.5,
    minWidth: 110,
    maxWidth: 120,
    // valueGetter: (params) => {
    //   return calculateOrderTotal(params.row.orders);
    // },
    // valueFormatter: (params) => {
    //   if (!params.value) {
    //     return "";
    //   }
    //
    //   return formatToCurrency(params.value);
    // },
  },
];

function InvoiceExplorerPage(props: GlobalState) {
  const invoicesQuery = useInvoices();
  const [orderSelectionID, setOrderSelectionID] = React.useState<
    string | undefined
  >();
  const invoiceSelected = invoicesQuery.data?.find(
    (order) => order.id === orderSelectionID,
  );

  const invoicesSorted = invoicesQuery.data
    ? [...invoicesQuery.data].sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return -1;
        } else {
          return 0;
        }
      })
    : [];

  function onOrderRowSelection(orderIDs: GridRowSelectionModel) {
    if (typeof orderIDs[0] === "string") {
      setOrderSelectionID(orderIDs[0]);
    }
  }

  function onNavigateToCreateInvoice() {
    props.setSelectedPageKey(CREATE_INVOICE_PAGE_KEY);
  }

  async function onSaveOrder(newOrder: Order) {
    console.log('TODO save order', newOrder);
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ p: 4 }}>
        Invoices
      </Typography>
      <Paper elevation={1} sx={{ marginBottom: 4, py: 3 }}>
        <Box
          sx={{
            mx: 2,
            my: 3,
          }}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={onNavigateToCreateInvoice}>Create Invoice</Button>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DataGridPro
                loading={invoicesQuery.isFetching}
                slots={{
                  loadingOverlay: LinearProgress,
                }}
                autoHeight
                rows={invoicesSorted}
                columns={columns}
                onRowSelectionModelChange={onOrderRowSelection}
                rowSelectionModel={orderSelectionID}
                hideFooterPagination={true}
              />
            </Grid>
          </Grid>
        </Box>

        {invoiceSelected && (
          <OrderFormDialog
            order={invoiceSelected}
            onClose={() => setOrderSelectionID(undefined)}
            onSave={onSaveOrder}
          />
        )}
      </Paper>
    </Container>
  );
}

export default InvoiceExplorerPage;
