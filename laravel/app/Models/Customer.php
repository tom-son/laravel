<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $businessName
 * @property string $name
 * @property string $abn
 * @property string $email
 */
class Customer extends Model
{
    use HasFactory;

    protected $connection = 'app_database';
    protected $table = 'customer';
    protected $fillable = [
        'abn',
        'businessName',
        'email',
        'name',
    ];
}
