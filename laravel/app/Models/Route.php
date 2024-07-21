<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $customer_id
 * @property string $description
 * @property string $price
 * @property int    $deleted
 */
class Route extends Model
{
    use HasFactory;

    public const TABLE = 'route';

    protected $connection = 'app_database';
    protected $table = self::TABLE;
}
