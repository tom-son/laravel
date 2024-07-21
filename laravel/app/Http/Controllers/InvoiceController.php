<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function getInvoices(Request $request): JsonResponse
    {
        return response()->json(Invoice::all());
    }

    public function getInvoice(Request $request, int $invoice_id): JsonResponse
    {
        $invoice = Invoice::query()
            ->select([
                'invoice.id',
                'invoice.abn',
                'invoice.contact',
                'invoice.customerID',
                'invoice.date',
                'invoice.email',
                'invoice.status',
                'invoice.created_at',
            ])
            ->where('invoice.id', $invoice_id)
            ->first();

        if (empty($invoice)) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        $orders = InvoiceOrder::query()->where('invoiceId', $invoice->id)->get();
        $invoice->orders = $orders;

        return response()->json($invoice);
    }
}
