<?php

namespace Tests\Feature\App\Http\Controllers;

use App\Models\Invoice;
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
}
