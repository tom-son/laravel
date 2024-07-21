<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoice_order', function (Blueprint $table) {
            $invoice_id = 'invoiceId';
            $route_id = 'routeId';
            $table->id();
            $table->unsignedBigInteger($invoice_id);
            $table->unsignedBigInteger($route_id);
            $table->float('quantity');
            $table->boolean('deleted')->nullable();
            $table->timestamps();

            $table->foreign($invoice_id)
                ->references('id')
                ->on('invoice');
            $table->foreign($route_id)
                ->references('id')
                ->on('route');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_order');
    }
};
