<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $invoiceId
 * @property int $routeId
 * @property float $quantity
 */
class InvoiceOrder extends Model
{
    use HasFactory;

    protected $connection = 'app_database';
    protected $table = 'invoice_order';
}
