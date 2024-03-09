<?php

namespace App\Service\Query;

use App\Service\ArrayKeysTransformator;
use Illuminate\Http\Request;

class ProjectTasksQuery extends QueryTransformer
{

    private string $id;

    public function __construct(string $id)
    {
        $this->id = $id;
    }

    protected array $filterParams = [
        "isDone" => "done",
    ];
    protected array $filterOperators = [
        "isDone" => ["="],
    ];
    protected array $filterValues = [
        "isDone" => ["true", "false"],
    ];

    public function filter(Request $request): array
    {
        return array_merge(parent::filter($request), [["project_id", "=", $this->id]]);
    }

}
