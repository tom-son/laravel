import React from "react";
import Order from "../types/Order";
import { useCustomer, useCustomerDescriptions } from "../hooks/customer";
import {
  formatDateFull,
  formatDateShort,
  formatToCurrency,
} from "../utilities/formatter";
import Description from "../types/Description";
import { Box, Typography } from "@mui/material";

interface InvoiceTemplateProps {
  order: Order;
}

function InvoicePrintTemplate(props: InvoiceTemplateProps) {
  const customerQuery = useCustomer(props.order.customerID);
  const customerDescriptionsQuery = useCustomerDescriptions(
    props.order.customerID,
  );
  if (customerQuery.isPending || customerDescriptionsQuery.isPending) {
    return <>Loading...</>;
  }

  const orderItemRows = props.order.items.map((orderItem) => {
    const description = customerDescriptionsQuery.data?.find(
      (description: Description) => description.id === orderItem.description,
    );
    const descriptionLabel = description ? (
      description.description
    ) : (
      <>Error: description undefined</>
    );
    return (
      <tr key={orderItem.id}>
        <TableData>{formatDateShort(new Date(orderItem.date))}</TableData>
        <TableData>{orderItem.loadTonnes}</TableData>
        <TableData>{orderItem.docketNumber}</TableData>
        <TableData>{descriptionLabel}</TableData>
        <TableData textAlign="right">
          {formatToCurrency(orderItem.rate)}
        </TableData>
        <TableData textAlign="right">
          {formatToCurrency(orderItem.total)}
        </TableData>
      </tr>
    );
  });

  return (
    <div style={{ margin: "20mm 15mm" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ textDecoration: "underline", paddingRight: "5mm" }}
          variant="h4"
        >
          TAX INVOICE
        </Typography>
        <Typography variant="h6">DO-IT TRANSPORT PTY LTD</Typography>

        <Box>
          <Typography variant="body1">ARN: 54 229 663 288</Typography>
          <Typography variant="body1">
            EMAIL: David@doittransport.com
          </Typography>
          <Typography variant="body1">PHONE: 024512412</Typography>
          <Typography variant="body1">INVOICE #: {props.order.id}</Typography>
          <Typography variant="body1">
            INVOICE DATE: {formatDateFull(new Date(props.order.date))}
          </Typography>
          <Typography variant="body1">TERMS: 30 Days</Typography>
        </Box>
      </div>

      <Box>
        <Typography variant="body1">
          Company: {customerQuery.data?.["businessName"]}
        </Typography>
        <Typography variant="body1">Contact: {props.order.contact}</Typography>
        <Typography variant="body1">ARN: {props.order.abn}</Typography>
        <Typography variant="body1">E-mail: {props.order.email}</Typography>
      </Box>
      <div>
        <table
          style={{
            marginTop: "5mm",
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Load (t)</TableHeader>
              <TableHeader>Docket #</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Rates</TableHeader>
              <TableHeader>Cost</TableHeader>
            </tr>
          </thead>

          <tbody>{orderItemRows}</tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeader(props: { children: React.ReactNode }) {
  return (
    <th
      style={{
        border: "1px solid black",
      }}
    >
      {props.children}
    </th>
  );
}

function TableData(props: {
  children: React.ReactNode;
  textAlign?: "left" | "right" | "center";
}) {
  return (
    <td
      style={{
        border: "1px solid black",
        textAlign: props.textAlign ?? "center",
        padding: "4px",
      }}
    >
      {props.children}
    </td>
  );
}

export default InvoicePrintTemplate;
