<?php

namespace App\Service;

class UserAuthenticator
{
    public function authenticate($authData)
    {
        if (!$token = auth()->attempt($authData)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return TokenResponser::createResponse($token);
    }

}
