<?php

namespace App\Service\Query;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectQuery extends QueryTransformer
{
    private int $userId;

    public function __construct()
    {

    }

    protected array $filterOperators = [
        "filter"=>"="
    ];

    protected array $filterParams = [
        "filter"=>"owner_id",
    ];

    protected array $filterValues = [
        "filter"=>["public", "my"]
    ];

    public function filter(Request $request): array
    {
        $query = [];
        $requestParam = $request->get("filter");
        if($requestParam === "my") {
            $query[] = ["owner_id", "=", Auth::user()->getAuthIdentifier()];
        }
        else if($requestParam === "public"){
            $query[] = ["is_public", "=", "true"];
        }
        return $query;
    }
}
