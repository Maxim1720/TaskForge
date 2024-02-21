<template>
  <nav class="nav">
    <div class="nav-task" v-if="userAuthenticated">
      <div class="nav-task">
        <router-link :to="AppPaths.MY_PROJECTS" class="nav-link" active-class="nav-link-active">Мои проекты
        </router-link>
        <router-link :to="AppPaths.PROJECTS" class="nav-link" active-class="nav-link-active">Публичные проекты
        </router-link>
      </div>
      <div class="nav-auth" v-if="userAuthenticated">
        <div class="nav-link">

          <Suspense>
            <TransitionGroup name="name">
              <template #default>
                <Me key="me"/>
              </template>
              <template key="fallback-me" #fallback>
                ...
              </template>
            </TransitionGroup>

          </Suspense>
        </div>
        <button @click="logoutFromAccount" class="nav-link">Выход</button>
      </div>
    </div>

    <div class="nav-auth" v-else>
      <router-link :to="AppPaths.REGISTRATION" class="nav-link" active-class="nav-link-active">Регистрация</router-link>
      <router-link :to="AppPaths.AUTHORIZATION" class="nav-link" active-class="nav-link-active">Войти</router-link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {AppPaths} from "../../definition/Paths";
import {logout} from "../../utils/auth";
import {ref, Suspense} from "vue";
import Me from "./Me.vue";
import {useAuthTokenStore} from "../../stores/AuthTokenStore";

const authTokenStore = useAuthTokenStore();
const router = useRouter();

const logoutFromAccount = () => {
  logout().then(() => {
    router.push(AppPaths.AUTHORIZATION);
  });
};


const userAuthenticated = ref(
    authTokenStore.getToken().accessToken !== ""
);

const setAuthenticated = (e: CustomEvent<boolean>) => {
  userAuthenticated.value = e.detail;
};

document.addEventListener("authenticated", setAuthenticated as EventListener);
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.name {
  &-enter {
    &-active {
      transition: all 0.2s;
    }

    &-from {
      opacity: 0;
    }
  }

  &-leave {
    &-active {
      transition: all 0.2s;
    }

    &-to {
      opacity: 0;
    }
  }
}

.nav {
  display: flex;
  height: 69px;
  padding: 10px 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 38px;
  flex: 1 0 0;

  &-task {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 36px;
    flex: 1 0 0;
    align-self: stretch;
  }

  &-auth {
    display: flex;
    gap: 38px;
    height: 100%;
    // flex: 1 0 0;
  }

  &-link {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    color: var(--primary, #676f9d);
    text-align: center;
    font-family: "Lato",sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.24px;

    background: transparent;

    &-active {
      color: #fff;
      text-shadow: 0 2px 4px #fff;
      // text-shadow: #fff;
      // text-shadow:5px 10px;
    }

    &:active {
      color: #fff;
    }

    // border-right: 1px solid white;
    // border-left: 1px solid white;
    // padding: 0px 12px;
  }
}
</style>