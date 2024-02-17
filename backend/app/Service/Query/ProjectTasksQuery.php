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

//    public function filter(Request $request): array
//    {
//        $requestQueries = $request->all();
//
////        dd($requestQueries);
//        $eloQuery = [];
//        $eloQuery[] = ["project_id", "=", $this->id];
//        foreach ($requestQueries as $param => $value) {
//            if (in_array($param, array_keys($this->filterParams))
//                && in_array($value, $this->filterValues[$param])) {
//                $eloQuery[] = [
//                    $this->filterParams[$param],
//                    $this->filterOperators[$param][0],
//                    $value
//                ];
//            }
//        }
//        return $eloQuery;
//    }

}
