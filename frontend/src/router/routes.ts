// import {defineComponent} from "vue";
import {AppPaths} from "../definition/Paths.ts";
import RegistrationVue from "../components/auth/Registration.vue";
import AuthorizationVue from "../components/auth/Authorization.vue";
import ProjectCreateVue from "../components/project/ProjectCreate.vue";
import {createRouter, createWebHistory} from "vue-router";
import {useAuthTokenStore} from "../stores/AuthTokenStore.ts";
import NotFound from "../components/UI/utils/NotFound.vue";

const tokenStoreWrapper = () => {
    return useAuthTokenStore();
}
const listOfGuestPaths = [AppPaths.AUTHORIZATION.toString(), AppPaths.REGISTRATION.toString(), AppPaths.NOT_FOUND.toString()];

const routes = [
    /* {
         path: "/",
         component: defineComponent({}),
     },*/
    {
        name: AppPaths.MY_PROJECTS,
        path: AppPaths.MY_PROJECTS,
        component: () => import("../components/project/Projects.vue"),
    },
    {
        name: AppPaths.MY_PROJECT,
        path: AppPaths.MY_PROJECT,
        component: () => import('../components/task/Tasks.vue')
    },
    {
        name: AppPaths.PROJECTS,
        path: AppPaths.PROJECTS,
        component: () => import("../components/project/PublicProjects.vue")
    },
    {

        name: AppPaths.REGISTRATION,
        path: AppPaths.REGISTRATION,
        component: RegistrationVue
    },
    {
        name: AppPaths.AUTHORIZATION,
        path: AppPaths.AUTHORIZATION,
        component: AuthorizationVue
    },
    {
        name: AppPaths.PROJECTS_CREATE,
        path: AppPaths.PROJECTS_CREATE,
        component: ProjectCreateVue
    },
    {
        name: AppPaths.NOT_FOUND,
        path: AppPaths.NOT_FOUND,
        component: NotFound
    },
    {
        name: AppPaths.PUBLIC_PROJECT,
        path: AppPaths.PUBLIC_PROJECT,
        component: ()=> import("../components/task/PublicTasks.vue")
    }
];


const router = createRouter({
    routes,
    history: createWebHistory(),
});

type RouterRule = {
    guard: string,
    canRoute: (route: string) => boolean,
    otherwisePath: string
    // excludedRoutes: string[]
    // route: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext)=> void
}

const routerRules: RouterRule[] = [
    {
        guard: "auth",
        canRoute: (route: string) => {
            return !listOfGuestPaths.includes(route) || route === AppPaths.NOT_FOUND;
        },
        otherwisePath: AppPaths.MY_PROJECTS
    },
    {
        guard: "guest",
        canRoute: (route: string) => {
            return listOfGuestPaths.includes(route);

        },
        otherwisePath: AppPaths.AUTHORIZATION
    }
];


const sendAuthEvent = (isAuth: boolean)=> {
    document.dispatchEvent(new CustomEvent("authenticated", {
        detail: isAuth
    }));
};
router.beforeEach((_to,
                   _from, _next) => {
    const isValidRoute = router.hasRoute(_to.name as string);
    if (!isValidRoute) {
        _next(AppPaths.NOT_FOUND);
        return;
    }
    const isAuthenticated = tokenStoreWrapper().getToken().accessToken !== "";
    sendAuthEvent(isAuthenticated);
    let guard = isAuthenticated ? "auth" : "guest";
    const routeRule = routerRules.find(rule => rule.guard === guard);
    if (routeRule?.canRoute(_to.path)) {
        _next();
        return;
    }
    _next(routeRule?.otherwisePath || AppPaths.NOT_FOUND);
});

export {router};