<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;

class ProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
//        return Response::deny("You can't view all projects", 403);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project): Response
    {
//        dd($project);
        return (
            $project->owner_id == $user->getAuthIdentifier()
            || $project->getAttribute("is_public")
        )
            ? Response::allow()
            : Response::denyWithStatus(403, "You can't view this project");
//        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project)
    {
        return $this->projectBelongToUser($user, $project)?
            Response::allow():
            Response::deny("You can't update this project");
//        return $this->projectBelongToUser($user->getAuthIdentifier(), $project);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project): bool
    {
        return $this->projectBelongToUser($user->getAuthIdentifier(), $project);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project): bool
    {
        return $this->projectBelongToUser($user->getAuthIdentifier(), $project);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return $this->projectBelongToUser($user->getAuthIdentifier(), $project);
    }

    private function projectBelongToUser($user, $project): bool
    {
        return (
            $project->owner_id == $user->getAuthIdentifier()
        );
    }
}
