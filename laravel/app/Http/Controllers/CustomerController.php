<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function getCustomers(Request $request): JsonResponse
    {
        return response()->json(Customer::all());
    }
}
