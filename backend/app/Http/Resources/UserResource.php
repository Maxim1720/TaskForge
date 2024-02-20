<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    private CapitalizePropertiesResource $capitalizator;
    public function __construct($resource)
    {
        parent::__construct($resource);
        $withUsernameInsteadNameResource = $resource;
        $withUsernameInsteadNameResource["username"] = $resource["name"];
        unset($withUsernameInsteadNameResource["name"]);
         $this->capitalizator = new CapitalizePropertiesResource($withUsernameInsteadNameResource);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->capitalizator->toArray($request);

//        return [
//            'id' => $this->id,
//            'username' => $this->name,
//            'createdAt' => $this->created_at,
//            'updatedAt' => $this->updated_at,
//            "email" => $this->email,
//            "emailVerifiedAt" => $this->email_verified_at
//        ];
    }

}
