<?php

namespace App\Http\Resources;

use App\Service\ArrayKeysTransformator;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use PhpParser\Node\Expr\Cast\Object_;

class CapitalizePropertiesResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return ArrayKeysTransformator::removeUnderscores($this->resource->toArray());
        //TODO : delegate to ArrayKeysTransformator
    }




}
