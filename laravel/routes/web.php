<?php

use App\Models\Customer;
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

Route::get('customer', function () {
    Customer::query()->create([
        'abn' => 'Test',
        'businessName' => 'Test',
        'email' => 'Test',
        'name' => 'Test',
    ]);

    dd(Customer::all());
});
