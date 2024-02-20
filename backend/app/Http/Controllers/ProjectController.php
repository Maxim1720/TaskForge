<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Service\ArrayKeysTransformator;
use App\Service\Query\ProjectQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:api")->only(["my"]);
        $this->authorizeResource(Project::class, "project");
    }

    public function index(Request $request)
    {
        if (!in_array($request->get("filter"), ["my", "public"])) {
            return response(["message" => "You can't view all projects"], 400, ["Content-Type" => "application/json"]);
        }

        $projectsQuery = new ProjectQuery();
        $projects = Project::query()->where($projectsQuery->filter($request))->paginate();
        return ProjectResource::collection($projects);
    }

    public function store(StoreProjectRequest $request): ProjectResource
    {
        $data = ArrayKeysTransformator::toWithUnderscores($request->json()->all());
        $project = new Project($data);
        $project->setAttribute("owner_id", Auth::getUser()->getAuthIdentifier());
        $project->save();
        return new ProjectResource($project);
    }

    public function show(Project $project): ProjectResource
    {
//        $this->authorizeForUser(Auth::user(), "view", $project);
        return new ProjectResource($project);
    }

    public function edit(Project $project)
    {
        dd($project);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {

//        dump(array_keys($project->getAttributes()));
        Project::query()->where("id", "=", $project->id)->updateOrCreate(
            array_keys($project->getAttributes()),
            array_map(function ($attr) use ($project) {
                return $project->getAttributes()[$attr];
            }, $project->getAttributes()));
        //
    }
//    public function destroy(\Illuminate\Http\Request $request): void
//    {
//        dd($request);
//        $urlParts = explode("/", $request->url());
//        $id = $urlParts[count($urlParts) - 1];
//        Project::destroy($id);
//        Project::destroy($project);
//    }

    public function destroy(Project $project)
    {
        $project->delete();
        return new ProjectResource($project);
    }
}
