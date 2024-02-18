<template>
  <div class="container">
    <form class="form" v-on:submit.prevent="submit">
      <h2 class="form-title">Авторизация</h2>
      <div class="form-inputs">
        <AuthTextInput inputName="email" input-placeholder="Email" :input-value="userAuthData.email"
          @valueChanged="onValueChanged" />

        <PasswordInput inputName="password" input-placeholder="Пароль" :input-value="userAuthData.password"
          @valueChanged="onValueChanged" />
        <div class="form-inputs-submit">
          <auth-btn value="Войти" />
        </div>
      </div>
      <Transition name="errors" mode="out-in">
        <div v-if="errors.length > 0">
          <Alert v-for="error in errors" :message="error.errors.map(e => e.message).join('\n')" danger />
        </div>
      </Transition>

    </form>
  </div>
</template>

<script setup lang="ts">
import {
  UserAuthorization,
} from "../../definition/User";
import AuthTextInput from "../UI/FormTextInput.vue";
import PasswordInput from "../UI/SecretTextInput.vue";
import AuthBtn from "../UI/SubmitBtn.vue";
import { useRouter } from "vue-router";
import { AppPaths } from "../../definition/Paths";
import { login } from "../../utils/auth";
import { Error } from "../../definition/Error";
import { ref } from "vue";
import Alert from "../UI/utils/Alert.vue";

const router = useRouter();
const userAuthData: UserAuthorization = {
  email: "",
  password: "",
};

const errors = ref<Error[]>([]);

const onValueChanged = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  // const name: "email" | "password" = target.name;
  userAuthData[target.name] = target.value;
  console.log(userAuthData[target.name]);
};

const submit = () => {
  login(userAuthData).then(() => {
    errors.value = [];
    router.push(AppPaths.MY_PROJECTS);
  }).catch(err => {
    errors.value = [{
      errors: [
        { message: err.message }
      ]
    }];
  });
};
</script>

<style scoped lang="scss">
.errors {
  &-enter {
    &-active {
      transition: all 0.3s ease-in-out;
    }

    &-from {
      opacity: 0;
      scale: 0;
    }
  }
  &-leave{
    &-active{
      transition: all 0.3s ease-in-out;
    }
    &-to{
      opacity: 0;
      scale: 0;
    }
  }

}


.form {

  transition: all 0.3s ease-in-out;

  display: flex;
  width: 575px;
  padding: 14px 10px;
  flex-direction: column;
  align-items: center;
  gap: 62px;
  border-radius: 9px;
  background: var(--Page, #2d3250);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

  &-title {
    display: flex;
    padding: 9px 0px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background: var(--secondary, #424769);

    color: var(--white, #fff);
    text-align: center;
    font-family: Lato;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 9.6px;
  }

  &-inputs {
    display: flex;
    padding: 0px 72px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    align-self: stretch;

    &-submit {
      display: flex;
      padding: 45px 0px 16px 0px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      align-self: stretch;

      &-btn {
        border: none;
        display: flex;
        padding: 9px 19px;
        justify-content: flex-end;
        align-items: flex-end;
        gap: 10px;
        border-radius: 5px;
        background: var(--accent, #f9b17a);
        color: var(--Page, #2d3250);
        text-align: center;
        font-family: Lato;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
}

.container {
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // width: 100%;
  height: 100%;
  gap: 10px;
  // flex: 1 0 0;
  // align-self: stretch;
}
</style>