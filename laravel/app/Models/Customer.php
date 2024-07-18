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

    public const TABLE = 'customer';

    protected $connection = 'app_database';
    protected $table = self::TABLE;
    protected $fillable = [
        'abn',
        'businessName',
        'email',
        'name',
    ];
}
