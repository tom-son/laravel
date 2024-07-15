<?php

namespace Tests\Feature\App\Http\Controllers;

use App\Models\Customer;
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
}
