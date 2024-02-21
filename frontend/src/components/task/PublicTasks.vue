<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import {useTaskStore} from "../../stores/TaskStore.ts";
import {useRoute} from "vue-router";
import {useProjectStore} from "../../stores/ProjectStore.ts";
import {useUserStore} from "../../stores/UserStore.ts";

const projectStore = useProjectStore();
const taskStore = useTaskStore();

const projectId = Number.parseInt(useRoute().params.id[0])

const tasks = await taskStore.getProjectTasks(projectId);
const project = await projectStore.getById(projectId);

const user = await useUserStore().getById(project.ownerId);
</script>

<template>
  <div>
    <div class="h-full w-fit flex flex-col items-center m-auto">
      <div class="project-title">
        "{{ project.name }}"
      </div>
      <div v-for="task in tasks" class="flex flex-col items-center ">
        <TaskCard :task="task" :key="task.id" :public="true" class="border-0"/>
        <div class="done self-end">{{ task.done ? "Выполнено!" : "В процессе выполнения" }}</div>
      </div>
      <div class="user self-end mt-8">
        {{ user.username }}
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">

.done {
  color: #676f9d;
}

.project {
  &-title {
    color: #718096;
    font-size: 24px;
  }
}

.user {
  color: #F9B17A;
  font-size: 1.2rem;
}

</style>