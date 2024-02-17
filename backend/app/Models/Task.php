<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    private int $project_id;
    private int $id;
    private string $title;
    private bool $done;

    protected $fillable = ["title", "done", "project_id"];
}
