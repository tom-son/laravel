<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $abn
 * @property string $contact
 * @property string $customerID
 * @property string $date
 * @property string $email
 * @property string $status
 */
class Invoice extends Model
{
    use HasFactory;

    protected $connection = 'app_database';
    protected $table = 'invoice';
}
