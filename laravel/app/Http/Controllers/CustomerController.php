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
        $customer_routes = Route::query()
            ->where(Route::CUSTOMER_ID_COLUMN, $customer_id)
            ->whereNull(Route::DELETED_COLUMN)
            ->orWhere(Route::DELETED_COLUMN, '=' ,0)
            ->get();
        if ($customer_routes->isEmpty()) {
            return response()->json(['message' => 'No routes found'], 404);
        }

        return response()->json($customer_routes);
    }

    public function createCustomerRoute(Request $request): JsonResponse
    {
        $route = new Route();
        $route->customer_id = $request->input('customer_id');
        $route->description = $request->input('description');
        $route->price = $request->input('price');
        $route->deleted = $request->input('deleted');
        $route->save();

        return response()->json($route);
    }

    public function deleteCustomerRoute(int $route_id): JsonResponse
    {
        $route = Route::query()->where('id', $route_id)->first();
        if (is_null($route)) {
            return response()->json(['message' => 'Route not found'], 404);
        }

        $route->deleted = true;
        $route->save();

        return response()->json(null, 204);
    }
}
