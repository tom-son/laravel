import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { formatDateFull, formatToCurrency } from "../utilities/formatter";
import {useCustomerDescriptions, useCustomerRoutes} from "../hooks/customer";
import Description from "../types/Description";
import ErrorComponent from "../components/ErrorComponent";

function CustomerDescription(props: {
  customerID: number;
  descriptionID: number;
}) {
  const customerRoutes = useCustomerRoutes(props.customerID);
  const descriptionOption = customerRoutes.data?.find(
    (description: Description) => description?.id === props.descriptionID,
  );
  if (!descriptionOption) {
    return <>{props.descriptionID}</>;
  }

  if (!descriptionOption.description) {
    return <ErrorComponent />;
  }

  return <>{descriptionOption.description}</>;
}

export const orderColumns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => {
      if (!params.row.date) {
        // The last row "Total rowspan" does not have a date
        return null;
      }

      return formatDateFull(params.row.date);
    },
  },
  {
    field: "docketNumber",
    headerName: "Docket #",
    type: "string",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    flex: 3,
    minWidth: 220,
    renderCell: (params: GridRenderCellParams<any, number>) => {
      if (!params.value) {
        return params.value;
      }

      return (
        <CustomerDescription
          customerID={params.row.customerID}
          descriptionID={params.value}
        />
      );
    },
  },
  {
    field: "rate",
    headerName: "Rate",
    type: "number",
    flex: 1,
    minWidth: 50,
    valueFormatter: (params) => {
      if (!params.value) {
        return "";
      }

      return formatToCurrency(params.value);
    },
  },
  {
    field: "loadTonnes",
    headerName: "Load (Tonnes)",
    type: "number",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    flex: 1.5,
    minWidth: 100,
    valueFormatter: (params) => {
      if (!params.value) {
        return "";
      }

      return formatToCurrency(params.value);
    },
  },
];
