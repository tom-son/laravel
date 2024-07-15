<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function getInvoices(Request $request): JsonResponse
    {
        return response()->json(Invoice::all());
    }
}
