
<template>
  <div class="container">

    <a @click="()=>$router.go(-1)" class="absolute left-10 rounded-3xl bg-white p-2 cursor-pointer hover:bg-amber-200 font-extrabold">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
      </svg>
    </a>

    <TaskForm @onAddTask="submit"/>

    <transition name="section">
      <div class="task-section" v-if="undone.length">
        <hr />
        <h2>Активные</h2>
        <transition-group tag="div" name="list" class="tasks">
          <TaskCard v-for="task in undone" :key="task.id" :task="task"
                    @onDelete="deleteTask"
                    @onDone="doneTask"
          />
        </transition-group>
      </div>
    </transition>

    <transition name="section">
      <div class="task-section done" v-if="done.length">
        <hr />
        <h2>Выполненные</h2>
        <transition-group name="list" tag="div" class="tasks">
          <TaskCard v-for="task in done" :key="task.id" :task="task"
                    @onDelete="deleteTask"
                    @onDone="doneTask"
          />
        </transition-group>
      </div>
    </transition>
    <transition name="section">
      <h2 v-if="!done.length && !undone.length">Задач нет!</h2>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import TaskCard from "./TaskCard.vue";
import TaskForm from "./TaskForm.vue";
import { useTaskStore } from "../../stores/TaskStore";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Task } from "../../definition/Task";
const taskStore = useTaskStore();
const projectId = useRoute().params.id;

console.log(projectId);

const done = ref(await taskStore.getDoneTasks(Number(projectId)));
const undone = ref(await taskStore.getUndoneTasks(Number(projectId)));

console.log(done);

const doneTask = (task: Task)=>{
  taskStore.doneTask(task).then(async json=>{
    console.log(json);
    undone.value = await taskStore.getUndoneTasks(task.projectId);
    done.value = await taskStore.getDoneTasks(task.projectId);
  });
}

const submit = (task: Task) => {
  console.log(task);
  taskStore.addTask({
    ...task,
    done: false,
    projectId: Number.parseInt(projectId[0]),
  }).then(async data=>{
    console.log(data);
    undone.value = await taskStore.getUndoneTasks(Number(projectId)); 
    // undone.value.push(parseGenericFromData<Task>(data));
    return data;
  });


};

const deleteTask = (task: Task) =>{
  // console.log(task);
  taskStore.deleteTask(task).then(async data=>{
    if(undone.value.find(v=>v.id===task.id)){
      undone.value = await taskStore.getUndoneTasks(task.projectId);
    }
    else{
      done.value = await taskStore.getDoneTasks(task.projectId);
    }
    return data;
  });
}
</script>

<style scoped lang="scss" >
.container {
  height: inherit;
  width: inherit;
}

.list {
  &-enter {
    &-active {
      transition: all 0.1s ease-in-out;
    }

    &-from {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  &-leave {
    &-active {
      transition: all 0.1s ease-in-out;
    }

    &-to {
      opacity: 0;
      transform: translateX(30px);
    }
  }
}

.section {
  &-enter {
    &-active {
      transition: all 0.5s;
    }

    &-from {
      opacity: 0;
      // transform: translateY(30px);
      transform: scale(0);
    }
  }

  &-leave {
    &-active {
      transition: all 0.1s;
    }

    &-to {
      opacity: 0;
      // transform: translateX(30px);
      transform: scale(0.1);
      // scale: 50px;
    }
  }
}

.done {
  opacity: 75%;
  transition-duration: 0.3s;

  &:hover {
    opacity: 100%;
  }
}

hr {
  width: 120%;
  opacity: 75%;
  box-shadow: 0 0 14px 0 #000;
  background-color: #424769;
  height: 1px;
  border: none;
  z-index: 0;
}

.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  flex: 1 0 0;

  height: 100%;
}

.task-section {
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.drop-down {
  content: "+";
}

h2 {
  color: #fff;
  text-align: center;
}
</style>