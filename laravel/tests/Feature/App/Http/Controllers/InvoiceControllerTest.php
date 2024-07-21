<?php

namespace Tests\Feature\App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceOrder;
use App\Models\Route;
use Tests\TestCase;

class InvoiceControllerTest extends TestCase
{
    public function test_get_all_invoices()
    {
        // given
        $invoice = new Invoice();
        $invoice->abn = 'ABN-1';
        $invoice->date = '2024-07-17';
        $invoice->email = 'bart@gmail.com';
        $invoice->contact = 'Bart Simpson';
        $invoice->customerID = '1';
        $invoice->status = 'New';
        $invoice->save();

        // when
        $response = $this->get('/invoices');

        // expect
        $response
            ->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function testGetNoneExistingInvoiceErrors()
    {
        // when
        $response = $this->get('/invoices/' . 1234);

        // expect
        $response
            ->assertStatus(404)
            ->assertExactJson([
                'message' => 'Invoice not found',
            ]);
    }

    public function testGetInvoiceWithEmptyOrders()
    {
        // given
        $invoice = new Invoice();
        $invoice->abn = 'ABN-1';
        $invoice->date = '2024-07-17';
        $invoice->email = 'bart@gmail.com';
        $invoice->contact = 'Bart Simpson';
        $invoice->customerID = '1';
        $invoice->status = 'New';
        $invoice->save();

        // when
        $response = $this->get('/invoices/' . $invoice->id);

        // expect
        $response
            ->assertStatus(200)
            ->assertJsonFragment([
                "id" => 1,
                "abn" => "ABN-1",
                "contact" => "Bart Simpson",
                "customerID" => "1",
                "date" => "2024-07-17",
                "email" => "bart@gmail.com",
                "status" => "New",
                "orders" => [],
            ]);
    }

    public function testGetInvoiceWithOrders()
    {
        $customer = new Customer();
        $customer->name = 'Bart Simpson';
        $customer->businessName = 'test';
        $customer->abn = '123456789';
        $customer->email = '2yjLd@example.com';
        $customer->save();

        // given
        $invoice = new Invoice();
        $invoice->abn = 'ABN-1';
        $invoice->date = '2024-07-17';
        $invoice->email = 'bart@gmail.com';
        $invoice->contact = $customer->name;
        $invoice->customerID = $customer->id;
        $invoice->status = 'New';
        $invoice->save();


        $route = new Route();
        $route->customer_id = $customer->id;
        $route->description = 'Sydney to Cabramatta';
        $route->price = 10025;
        $route->save();

        $order_1 = new InvoiceOrder();
        $order_1->invoiceId = $invoice->id;
        $order_1->routeId = $route->id;
        $order_1->quantity = 10.12;
        $order_1->save();

        // when
        $response = $this->get('/invoices/' . $invoice->id);

        // expect
        $response
            ->assertStatus(200)
            ->assertJson([
                "id" => 1,
                "abn" => "ABN-1",
                "contact" => "Bart Simpson",
                "customerID" => "1",
                "date" => "2024-07-17",
                "email" => "bart@gmail.com",
                "status" => "New",
                "orders" => [
                    [
                        "id" => 1,
                        "invoiceId" => 1,
                        "quantity" => 10.12,
                        "routeId" => 1,
                        "deleted" => null,
                    ]
                ],
            ]);
    }
}
