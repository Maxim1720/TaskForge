<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Service\Query\ProjectTasksQuery;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ProjectTasksController extends Controller
{


    public function __construct()
    {
//        $this->authorizeResource(Project::class, "project");
    }

    public function index(Request $request, Project $project)
    {

    }

}
