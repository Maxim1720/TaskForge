<?php

namespace App\Service;

use Illuminate\Http\JsonResponse;

class TokenResponser
{

    private static $tokenTTL = 60;

    public static function createResponse($token)
    {
        return self::responseWithToken($token);
    }

    public static function createResponseWithCookie($token)
    {
        $cookie = cookie("auth-token", $token, self::$tokenTTL);
        return self::responseWithToken($token)->cookie($cookie);
    }

    private static function responseWithToken($token): JsonResponse
    {
        return response()->json([
            'accessToken' => $token,
            'tokenType' => 'bearer',
            'expiresIn' => auth()->factory()->getTTL() * self::$tokenTTL
        ]);
    }
}
