<?php

namespace App\Service\Query;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectQuery extends QueryTransformer
{
    private int $userId;

    public function __construct()
    {
//        $this->filterValues["filter"][] = Auth::user()->getAuthIdentifier();
//        dd($this->filterValues);
    }

    protected array $filterOperators = [
        "filter"=>"="
    ];

    protected array $filterParams = [
        "filter"=>"owner_id"
    ];

    protected array $filterValues = [
        "filter"=>["all", "my"]
    ];

    public function filter(Request $request): array
    {
        $query = [];
        $requestParam = $request->get("filter");
        $query[] = ["owner_id", "=",  Auth::user()->getAuthIdentifier()];
        if(!$requestParam == "my"){
            $query[] = ["is_public", "=", "true"];
        }
        return $query;
    }
}
