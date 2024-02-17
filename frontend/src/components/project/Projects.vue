
<template>
  <div class="container">
    <div class="container">
      <div class="container" v-if="projects.length>0">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" :owner="undefined"
          @open="openProject"/>
      </div>
      <div v-else>
        <h2>Пока что у вас нет проектов</h2>
      </div>
    </div>
    <div class="btns">
      <button class="btns-create" @click="openCreate">Создать</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProjectCard from "./ProjectCard.vue";
import { useProjectStore } from "../../stores/ProjectStore";
import { useRouter } from "vue-router";
import { AppPaths } from "../../definition/Paths";
import {  ref } from "vue";

const projectsStore = useProjectStore();
const projects = ref(await projectsStore.getCurrentUserProjects()
.then(projects => projects.map(p => ({
  ...p,
  ownerId: undefined
}))));
// const loaded = ref<boolean>(false);

const router = useRouter();

const openProject = (id: number) => {
  console.log(router.currentRoute.value.path);
  router.replace(router.currentRoute.value.path + "/" + id);
}
const openCreate = () => {
  router.push(AppPaths.PROJECTS_CREATE);
  // loaded.value = true;
};
</script>


<style scoped lang="scss">
.container {
  display: flex;
  padding: 10px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
  flex-wrap: wrap;
  width: 100%;
}

.projects {
  display: grid;
  grid-template: 1fr 1fr 1fr 1fr;
}

h2 {
  color: #fff;
  text-align: center;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btns {
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  align-self: stretch;
  // width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;

  &-create {
    display: flex;
    padding: 10px;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
    border-radius: 3px;
    background: var(--accent, #f9b17a);
    color: var(--Page, #2d3250);
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    &:active {
      color: #fff;
    }
  }
}
</style>