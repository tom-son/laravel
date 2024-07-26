import { useQuery} from "@tanstack/react-query";
import Handlers from "../api/handlers.tsx";
import InvoicesApi from "../api/InvoicesApi.tsx";

export function useInvoices() {
    const customerQuery = useQuery({
        queryKey: [Handlers.INVOICES_KEY],
        queryFn: InvoicesApi.getInvoices,
        staleTime: 120000,
    });

    return customerQuery;
}