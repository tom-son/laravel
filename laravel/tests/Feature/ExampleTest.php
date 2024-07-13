<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Customer;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_database_test_connection(): void
    {
        $customer = new Customer();
        $customer->name = 'Customer name';
        $customer->abn = 'ABN-001';
        $customer->businessName = 'Business Name';
        $customer->email = 'test@me.com';
        $customer->save();

        $response = $this->get("/customers");
        $response
            ->assertStatus(200)
            ->assertJson([
                [
                    "abn" => "ABN-001",
                    "businessName" => "Business Name",
                    "email" => "test@me.com",
                    "id" => 1,
                    "name" => "Customer name",
                ]
            ])
            ->assertJsonCount(1);
    }
}
