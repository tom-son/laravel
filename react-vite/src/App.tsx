import React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
} from "@mui/material";
import OrdersPage from "./orders/OrdersPage";
import InvoiceExplorerPage from "./invoices/InvoiceExplorerPage";
import CustomersPage from "./customers/CustomersPage";

export interface GlobalState {
    selectedCustomerID: number | null;
    setSelectedCustomerID: (customerID: number | null) => void;
    setSelectedPageKey: (pageKey: string) => void;
}

export const CREATE_INVOICE_PAGE_KEY = "createInvoice";
export const INVOICES_PAGE_KEY = "invoices";
const pageDescriptions = [
    {
        key: INVOICES_PAGE_KEY,
        label: "Invoices",
        renderPage: (props: GlobalState) => <InvoiceExplorerPage {...props} />,
    },
    {
        key: CREATE_INVOICE_PAGE_KEY,
        label: "Create Invoice",
        hiddenToolbar: true,
        renderPage: (props: GlobalState) => <OrdersPage {...props} />,
    },
    {
        key: "customers",
        label: "Customers",
        renderPage: () => <CustomersPage />,
    },
];

function App() {
    const [selectedPageKey, setSelectedPageKey] = React.useState(
        pageDescriptions[0].key,
    );

    const currentPageDescription = pageDescriptions.find(
        (pageDescription) => pageDescription.key === selectedPageKey,
    );

    const [selectedCustomerID, setSelectedCustomerID] = React.useState<
        number | null
    >(null);

    const globalState: GlobalState = {
        selectedCustomerID,
        setSelectedCustomerID,
        setSelectedPageKey,
    };

    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ px: 14 }}>
                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { xs: "flex" } }}>
                            {pageDescriptions
                                .filter((tab) => !tab.hiddenToolbar)
                                .map((page) => (
                                    <Button
                                        key={page.key}
                                        onClick={() => setSelectedPageKey(page.key)}
                                        sx={{ my: 2, color: "white", display: "block" }}
                                    >
                                        {page.label}
                                    </Button>
                                ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {currentPageDescription?.renderPage(globalState)}
        </Box>
    );
}

export default App;
