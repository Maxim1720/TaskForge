<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WithTimestampResource extends JsonResource
{
    public function toArray(Request $request): array|\JsonSerializable|\Illuminate\Contracts\Support\Arrayable
    {
        return [
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at
        ];
    }
}
