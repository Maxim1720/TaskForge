<?php

namespace App\Service;

class Responser
{

    public static function createSuccessResponse($data = [], $message = "")
    {
        return self::response([
            "data" => $data,
            "message" => $message,
            "status" => "ok"
        ], 200);
    }

    public static function createErrorResponse($data = [], $message = "")
    {
        return self::response([
            "data" => $data,
            "message" => $message,
            "status" => "error"
        ], 400);
    }

    private static function response($body, $status)
    {
        return response()->json($body, $status);
    }
}
