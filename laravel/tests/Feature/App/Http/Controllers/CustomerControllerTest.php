<?php

namespace Tests\Feature\App\Http\Controllers;

use App\Models\Customer;
use App\Models\Route;
use Tests\TestCase;

class CustomerControllerTest extends TestCase
{
    public function test_get_all_customers()
    {
        // given
        $customer = new Customer();
        $customer->name = 'Bart Simpson';
        $customer->businessName = 'test';
        $customer->abn = '123456789';
        $customer->email = '2yjLd@example.com';
        $customer->save();

        // when
        $response = $this->get('/customers');

        // expect
        $response
            ->assertStatus(200)
            ->assertJsonFragment($customer->toArray())
            ->assertJsonCount(1);
    }

    public function test_get_customer_routes()
    {
        // given
        $customer = new Customer();
        $customer->name = 'Bart Simpson';
        $customer->businessName = 'test';
        $customer->abn = '123456789';
        $customer->email = '2yjLd@example.com';
        $customer->save();

        $route_customer = new Route();
        $route_customer->customer_id = $customer->id;
        $route_customer->description = 'Sydney to Cabramatta';
        $route_customer->price = 2500;
        $route_customer->save();

        $customer_other = new Customer();
        $customer_other->name = 'Lisa Other';
        $customer_other->businessName = 'test';
        $customer_other->abn = '8567856';
        $customer_other->email = 'other@example.com';
        $customer_other->save();

        $route_customer_other = new Route();
        $route_customer_other->customer_id = 2;
        $route_customer_other->description = 'Melbourne to Sunshine';
        $route_customer_other->price = 1025;
        $route_customer_other->save();

        // when
        $response = $this->get('/customers/' . $customer->id . '/routes');

        // expect
        $response
            ->assertStatus(200)
            ->assertJsonFragment([
                "id" => 1,
                "customer_id" => 1,
                "description" => "Sydney to Cabramatta",
                "price" => 2500,
                "deleted" => null,
            ])
            ->assertJsonCount(1);
    }

    public function test_get_empty_customer_routes_error()
    {
        // when
        $response = $this->get('/customers/130/routes');

        // expect
        $response
            ->assertStatus(404)
            ->assertExactJson([
                "message" => "No routes found"
            ])
            ->assertJsonCount(1);
    }
}
