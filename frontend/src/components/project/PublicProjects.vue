<template>
    <div class="container" >
        <!-- <Suspense>
            <template #default>
                
            </template>
            <template #fallback>
                <Loading />
            </template>
        </Suspense> -->
        <ProjectCard v-for="p in projectsWithUsers" :key="p.project.id" @open="openProject" v-bind="p"/>
    </div>
</template>

<script setup lang="ts">
import { useProjectStore } from '../../stores/ProjectStore';
import ProjectCard from './ProjectCard.vue';
import { Project, ProjectWithUser } from '../../definition/Project';
import { onMounted, ref } from 'vue';
import { UserCurrent } from '../../definition/User';
import { useAuthTokenStore } from '../../stores/AuthTokenStore';
import {router} from "../../router/routes.ts";
import {AppPaths} from "../../definition/Paths.ts";
const authTokenStore = useAuthTokenStore();

const openProject = (id: number) => {
  const currentUrl = router.currentRoute.value.path;
  router.push(currentUrl+`/${id}`);
};

const fetchUser = async (id: number): Promise<UserCurrent> => {
    const resp = await fetch("/api/users/" + id, {
        method: "GET",
        headers: {
            "Authorization": authTokenStore.tokenForAuth(),
        },
    });
    const json = await resp.json();
    return json.data as UserCurrent;
};

const getProjectWithUser = async (p: Project): Promise<ProjectWithUser> => {
    const user = ref<UserCurrent>(await fetchUser(p.ownerId));
    return {
        user: user.value,
        project: p
    };
};

const getAllProjectsWithUsers = async () => {
    return Promise.all(projects.value.map(async (p) => await getProjectWithUser(p)));
};


const projectsStore = useProjectStore();
const projects = ref<Project[]>(await projectsStore.getPublic());
const projectsWithUsers = ref<ProjectWithUser[]>(await getAllProjectsWithUsers());

onMounted(async ()=>{
    projectsWithUsers.value = await getAllProjectsWithUsers();
});

</script>

<style lang="scss" scoped>
.container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    height: inherit;
}
</style>
