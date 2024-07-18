<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Route;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function getCustomers(Request $request): JsonResponse
    {
        return response()->json(Customer::all());
    }

    public function getCustomerRoutes(Request $request, int $customer_id): JsonResponse
    {
        $customer_routes = Route::query()->where('customer_id', $customer_id)->get();
        if ($customer_routes->isEmpty()) {
            return response()->json(['message' => 'No routes found'], 404);
        }

        return response()->json($customer_routes);
    }
}
