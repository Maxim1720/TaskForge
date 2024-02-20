<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
//    private string $name;
//    private string $description;
//    private \DateTime $expiryAt;
//    private int $ownerId;
    protected $fillable = ["name", "description", "expiry_at", "owner_id", "is_public"];
}

