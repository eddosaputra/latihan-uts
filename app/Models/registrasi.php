<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class registrasi extends Model
{
    use HasFactory;

    protected $table = 'registrasis';

    protected $fillable = [
        'participant_name',
        'event_name',
        'event_date',
        'registration_number',
        'category',
    ];
}
