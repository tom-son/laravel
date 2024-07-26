import requestHandler from "./requestHandler.tsx";

class InvoicesApi
{
    public static async getInvoices(): Promise<any[]>
    {
        const result = await requestHandler.get("/invoices");
        return result.data;
    }
}

export default InvoicesApi;