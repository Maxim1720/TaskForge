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
//        return TaskResource::collection(Task::query()->paginate());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

//        Task::creating(function (){
//
//        });
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): TaskResource
    {

        $taskJson = $request->json()->all();
//        $isDone = $taskJson["isDone"];
//        unset($taskJson["isDone"]);
//        $taskJson["done"] = $isDone;
        $task = new Task(ArrayKeysTransformator::toWithUnderscores($taskJson));

//        dd($task);
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
//        dd($project, $task);
//        $id = Task::query()->delete($task->id);
//        dd($id);
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



#int main(char **argv, int argc){
#    printf("Hello, world!");
#}
