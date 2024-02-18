<script setup lang="ts">
import { Task } from "../../definition/Task";
import { useTaskStore } from "../../stores/TaskStore";

const taskStore = useTaskStore();
const props = defineProps<{ task: Task }>();
</script>
  
<template>
  <div :class="['task', task.done ? 'task-done' : '']">
    <div class="data">
      <div class="data-title">{{ task.title }}</div>
      <div class="data-date" v-if="task.expiryAt">
        {{ task.expiryAt.toLocaleString().replace(new RegExp("[T,]"), " ") }}
      </div>
    </div>
    <div class="buttons">
      <button
        @click="() => taskStore.doneTask(props.task)"
        class="buttons-done"
      >
        {{ task.done ? "Не завершено" : "Завершить" }}
      </button>
      <button
        @click="$emit('onDelete', $props.task)"
        class="buttons-delete"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
.task {
  display: flex;
  width: 638px;
  padding: 19px 66px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 15px;
  border: 1px solid #424769;
  box-shadow: inset 0px 0px 12px 0px #424769;
  transition-duration: 0.2s;
  &:hover {
    box-shadow: inset 0px 0px 50px 0px #424769;
  }

  &-done {
    opacity: 50%;
    transition-duration: 0.3s;
    &:hover {
      opacity: 100%;
    }
  }
}

.data {
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  &-title {
    color: #fff;
    text-align: center;
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &-date {
    color: #fff;
    text-align: center;
    font-family: Raleway;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

.buttons {
  display: flex;
  width: 304px;
  height: 33px;
  justify-content: space-between;
  align-items: center;

  &-done {
    display: flex;
    // width: 94px;
    padding: 9px 6px 8px 6px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 5px;
    background: #f9b17a;

    color: #2d3250;
    text-align: center;
    font-family: Raleway;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &:hover {
      background: #feddc4;
    }
  }

  &-delete {
    display: flex;
    width: 78px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 5px;
    background: #424769;

    color: #fff;
    text-align: center;
    font-family: Raleway;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    &:hover{
      background: #585F8D;
    }
  }
}

button {
  border: none;
}

button:hover {
  opacity: 100%;
}
</style>
  