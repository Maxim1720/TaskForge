<template>
  <div class="container">
    <ProjectForm
      @submit="submit"
      :owner="userCurrentStore.me"
      v-if="userCurrentStore.me"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Project } from "../../definition/Project";
import { useProjectStore } from "../../stores/ProjectStore";
import ProjectForm from "./ProjectForm.vue";
import { useCurrentUserStore } from "../../stores/CurrentUserStore";
import { AppPaths } from "../../definition/Paths";

const userCurrentStore = useCurrentUserStore();

const projectStore = useProjectStore();

const router = useRouter();

const submit = (p: Project) => {
  projectStore.add(p).then(()=>router.push(AppPaths.MY_PROJECTS));
  // router.back();

};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1 0 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>