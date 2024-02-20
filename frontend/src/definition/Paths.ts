export enum AppPaths{
    PROJECTS = "/projects/public",
    MY_PROJECTS="/projects/my",
    REGISTRATION = "/sign-up",
    AUTHORIZATION = "/sign-in",
    PROJECTS_CREATE = "/projects/create",
    MY_PROJECT = MY_PROJECTS+"/:id",
    PUBLIC_PROJECT = PROJECTS + "/:id",

    NOT_FOUND = "/not-found"
}