<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Route;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function createCustomer(Request $request): JsonResponse
    {
        $customer = new Customer();
        $customer->name = $request->input('name');
        $customer->businessName = $request->input('name');
        $customer->abn = $request->input('abn');
        $customer->email = $request->input('email');
        $customer->save();

        return response()->json($customer);
    }

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
