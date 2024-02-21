<script setup lang="ts">
import Loading from "./components/UI/utils/Loading.vue";
import Logo from "./components/nav/Logo.vue";
import NavPanel from "./components/nav/Nav.vue";
import { Suspense } from "vue";
</script>

<template>
  <div class="app">
    <header class="header">
      <Logo />
      <NavPanel />
    </header>
    <Suspense>
      <router-view v-slot="{ Component }">
        <Transition name="router" mode="out-in"  class="main">
<!--          <keep-alive>-->
            <component #default :is="Component" />
<!--          </keep-alive>-->
        </Transition>
      </router-view>
      <template class="w-full border border-red-100" #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>

.router {

  &-enter {
    width: 100%;
    &-active {
      transition: all 0.2s;
    }

    &-from {
      opacity: 0;
      height: 0;
    }

    &-to{
      width: 100%;
    }
  }

  &-leave {
    &-active {
      transition: all 0.3s;
    }

    &-to {
      //transform: scale(0);
      opacity: 0;
      height: 0;
      transform: translateY(10svh) scale(0);
    }
  }
}

.header {
  display: flex;
  // width: 1420px;
  width: 100%;
  height: 89px;
  padding: 10px;
  align-items: center;
  gap: 36px;

  // border-bottom: 1px solid rgba(66, 71, 105, 0.75);
  box-shadow: 0 4px 12px -9px #000;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  height: 100%;
  flex: 1 0 0;
  // margin: 0 auto;
}

.app {
  display: flex;
  // min-width: 1440px;
  min-height: 100svh;
  // width: 100%;
  // padding: 38px 96px 0px 96px;
  padding: 13px 10px;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  background: #2d3250;
}
</style>
