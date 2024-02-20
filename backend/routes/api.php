<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectTasksController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/test', function () {
    return response()->json(["test" => "ok"]);
});


//Route::group(["middleware"=>"auth"], function (){
//
//});

//Route::apiResource("projects", ProjectController::class);
//Route::apiResource("projects/{project}/tasks", TaskController::class);
//Route::post("projects/{project}/tasks/{task}/done", [TaskController::class, "done"]);


Route::group([],function () {
    Route::apiResource('projects', ProjectController::class);

    Route::prefix('projects')->group(function () {

        Route::bind("project", function ($val){
            return \App\Models\Project::query()->findOrFail($val);
        });

        Route::apiResource('{project}/tasks', TaskController::class);
        Route::post("{project}/tasks/{task}/done", [TaskController::class, "done"]);
    });
});


Route::group([
    "middleware" => "api",
    "prefix" => "auth"
], function () {
    Route::post('login', [AuthController::class, "login"]);
    Route::post('logout', [AuthController::class, "logout"]);
    Route::post('refresh', [AuthController::class, "refresh"]);
    Route::post('me', [AuthController::class, "me"]);
    Route::post("sign-up", [RegistrationController::class, 'register']);
});


Route::resource("/users", UserController::class)
    ->middleware(["auth", "api"]);
