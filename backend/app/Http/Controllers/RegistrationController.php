<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\UserAuthenticator;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator;
use function Laravel\Prompts\password;

class RegistrationController extends Controller
{
    public function __construct()
    {

    }

    public function register(Request $request)
    {
        try {
            $this->validate($request, [
                "email" => ["required", "unique:users", "min:8"],
                "password"=>["required", "min:8"]
                ]
            );
        } catch (ValidationException $e) {
//            dd($e);
            return \response($e->errors(), $e->status);
        }

        $user = new User(array_merge(request()->json()->all(), ["name" => \request()->json()->get("username")]));
        $user->save();
        return response()->json([], "200");
    }
}
