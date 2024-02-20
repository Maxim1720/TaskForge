<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import {useTaskStore} from "../../stores/TaskStore.ts";
import {useRoute} from "vue-router";

const taskStore = useTaskStore();
const tasks = await taskStore.getProjectTasks(
    Number.parseInt(useRoute().params.id[0])
);

</script>

<template>
  <div class="h-full w-full flex flex-col items-center">
    <div v-for="task in tasks" class="flex flex-col items-center ">
      <TaskCard :task="task"  :key="task.id" :public="true" class="border-0"/>
      <div class="done self-end">{{task.done?"Выполнено!": "В процессе выполнения"}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.done{
  color: #676f9d;
}

</style>