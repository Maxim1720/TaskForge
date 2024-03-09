<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Service\ArrayKeysTransformator;
use App\Service\Query\ProjectTasksQuery;
use App\Service\Responser;
use Illuminate\Http\Request;
use function Symfony\Component\Translation\t;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project, Request $request)
    {
        $queryTransformer = new ProjectTasksQuery($project->id);
        $queryParams = $queryTransformer->filter($request);
        return TaskResource::collection(Task::query()->where($queryParams)->paginate());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): TaskResource
    {

        $taskJson = $request->json()->all();
        $task = new Task(ArrayKeysTransformator::toWithUnderscores($taskJson));
        $task->save();
        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, Task $task)
    {
        Task::destroy([$task->getAttribute("id")]);
        return Responser::createSuccessResponse(data: [], message: "task deleted");
    }

    public function done(Project $project, Task $task)
    {
        $task->setAttribute("done", !$task->getAttribute("done"));
        $task->save();
        return new TaskResource($task);
    }
}
