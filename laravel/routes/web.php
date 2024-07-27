<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/hello', function (Request $request) {
    return view('welcome');
});

Route::get('/user', function (Request $request) {
    $users_before = \App\Models\User::all();

    $nextVersion = $users_before->count() + 1;
    \App\Models\User::query()->insert([
        'name' => "Test $nextVersion",
        'email' => "test.$nextVersion@gmail.com",
        'password' => 'password',
    ]);

    $users_after = \App\Models\User::all()->pluck('name');

    dd(
        'before count:',
        $users_before->count(),
        'after:',
        $users_after
    );
});

Route::prefix('customers')->group(function() {
    Route::get('/', [CustomerController::class,'getCustomers']);
    Route::post('/', [CustomerController::class,'createCustomer']);

    Route::delete('/routes/{route_id}', [CustomerController::class,'deleteCustomerRoute']);

    Route::get('/{customer_id}/routes', [CustomerController::class,'getCustomerRoutes']);
    Route::post('/{customer_id}/routes', [CustomerController::class,'createCustomerRoute']);
});

Route::prefix('invoices')->group(function() {
    Route::get('/', [InvoiceController::class,'getInvoices']);
    Route::get('/{invoice_id}', [InvoiceController::class,'getInvoice']);
});
