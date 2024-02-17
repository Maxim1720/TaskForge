<?php

namespace App\Service\Query;

use Illuminate\Http\Request;

class QueryTransformer
{

    protected array $filterParams = [];
    protected array $filterOperators = [];
    protected array $filterValues = [];


    public function filter(Request $request): array
    {
        $requestParams = $request->all();
        $eloQuery = [];
        foreach ($requestParams as $param => $value) {
            if (in_array($param, array_keys($this->filterParams))
                && in_array($value, $this->filterValues[$param])) {
                $eloQuery[] = [
                    $this->filterParams[$param],
                    $this->filterOperators[$param][0],
                    $value
                ];
            }

        }
        return $eloQuery;
    }
}
