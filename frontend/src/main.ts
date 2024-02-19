import { createApp, defineComponent } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router';
import RegistrationVue from './components/auth/Registration.vue';
import AuthorizationVue from './components/auth/Authorization.vue';
import { AppPaths } from './definition/Paths';
import ProjectCreateVue from "./components/project/ProjectCreate.vue";
import { useAuthTokenStore } from './stores/AuthTokenStore';

const tokenStoreWrapper = ()=>{
    return useAuthTokenStore();
}

const routes = [
    {
        path: "/",
        component: defineComponent({}),
        beforeEnter: (_to: any, _from: any, next: any) => {
            next(AppPaths.MY_PROJECTS);
        }
    },
    {
        path: AppPaths.MY_PROJECTS,
        component: () => import("./components/project/Projects.vue"),
        beforeEnter: (_to: any, _from: any, next: any) => {
            if (tokenStoreWrapper().getToken().accessToken == "") {
                next(AppPaths.AUTHORIZATION);
            }
            else {
                next();
            }
        }
    },
    {
        path: AppPaths.MY_PROJECT,
        // component: () => import('./components/task/Tasks.vue'),
        component: ()=>import('./components/task/Tasks.vue')
    },
    { path: AppPaths.PROJECTS, component: () => import("./components/project/AllProjects.vue") },
    { path: AppPaths.REGISTRATION, component: RegistrationVue },
    { path: AppPaths.AUTHORIZATION, component: AuthorizationVue },
    { path: AppPaths.PROJECTS_CREATE, component: ProjectCreateVue }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

const app = createApp(App);
app.use(createPinia()).use(router).mount("#app");