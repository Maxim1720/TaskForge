<?php

namespace App\Http\Resources;

use App\Models\Task;
use App\Service\ArrayKeysTransformator;
use App\Service\Query\ProjectTasksQuery;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectTasksResource extends JsonResource
{




    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return parent::toArray($request);
    }
}
