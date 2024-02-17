<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Service\TokenResponser;
use App\Service\UserAuthenticator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private UserAuthenticator $authenticator;

    public function __construct()
    {
        $this->middleware("auth:api", ["except" => ["login"]]);
        $this->authenticator = new UserAuthenticator();
    }

    public function login()
    {
        $credentials = request()->json()->all();
        return $this->authenticator->authenticate($credentials);
    }

    public function logout(): JsonResponse
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(): JsonResponse
    {
        return TokenResponser::createResponse(\auth()->refresh());
    }

    public function me()
    {
        return new UserResource(auth()->user());
//        return response()->json();
    }
}
