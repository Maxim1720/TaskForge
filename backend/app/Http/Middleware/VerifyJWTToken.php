<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;

class VerifyJWTToken extends Middleware
{
    public function handle(Request $request, Closure $next)
    {
        if($request->header("Authorization")){

        }
    }


    private function isValid(string $token)
    {

    }
}
