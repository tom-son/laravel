<?php

use App\Models\Customer;
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
        Schema::create('route', function (Blueprint $table) {
            $customer_id_primary_key = 'customer_id';
            $table->id();
            $table->unsignedBigInteger($customer_id_primary_key);
            $table->string('description');
            // unit cents - since SQLite doesn't support a currency data type
            $table->integer('price');
            $table->boolean('deleted')->nullable();
            $table->timestamps();

            $table->foreign($customer_id_primary_key)
                ->references('id')
                ->on(Customer::TABLE);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('route');
    }
};
