<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(string $id): UserResource
    {
        return new UserResource(User::query()->findOrFail($id));
    }
}
