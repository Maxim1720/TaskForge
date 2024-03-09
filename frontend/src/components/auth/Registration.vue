<template>
  <div class="container">
    <form class="registration-form" @submit.prevent="submit">
      <h2 class="registration-form-title">Регистрация</h2>
      <div class="registration-form-input-section">
        <AuthTextInput inputPlaceholder="Email" inputName="email" :inputValue="formData.email" @valueChanged="setValue" />
        <AuthTextInput inputPlaceholder="Имя пользвотеля" inputName="username" :inputValue="formData.username"
          @valueChanged="setValue" />
        <SecretTextInput inputPlaceholder="Пароль" inputName="password" :inputValue="formData.password"
          @valueChanged="setValue" />
        <div class="registration-form-submit">
          <auth-btn value="Зарегистрироваться" />
        </div>
      </div>
      <div class="" v-if="errors.length > 0">
        <Alert v-for="error in errors" :message="error.errors.join('\n')" danger />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { UserRegistration } from "../../definition/User";
import AuthTextInput from "../UI/FormTextInput.vue";
import AuthBtn from "../UI/SubmitBtn.vue";
import { AppPaths } from "../../definition/Paths";
import { useRouter } from "vue-router";
import SecretTextInput from "../UI/SecretTextInput.vue";
import Alert from "../UI/utils/Alert.vue";
import { Error } from "../../definition/Error";


const router = useRouter();

const setValue = (e: InputEvent) => {
  console.log(e);
  const target = e.target as HTMLInputElement;
  formData.value[target.name  as "email"|"password"|"username"] = target.value;
};

const errors = ref<Error[]>([]);

const submit = () => {
  errors.value = [];
  fetch("/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData.value),
  }).then((resp) => {
    if (resp.ok) {
      router.push(AppPaths.AUTHORIZATION);
      error.value.message = undefined;
    }
    else {
      resp.json().then(json => {
        Object.keys(json).forEach(k => {
          errors.value = Array({
            errors: json[k]
          });
        })
      });
    }
  }).catch(err => {
    errors.value.push({
      errors: [{
        message: err.message
      }]
    });
  });
};

const formData: Ref<UserRegistration> = ref({
  username: "",
  password: "",
  email: "",
});

const error = ref<{
  message?: string
}>({});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
}

.registration-form {
  display: flex;
  width: 575px;
  min-height: 553px;
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
    font-family: "Lato", "Raleway";
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 9.6px;
  }

  &-input-section {
    display: flex;
    padding: 0px 72px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    flex: 1 0 0;
    align-self: stretch;

    &_input {
      display: flex;
      padding: 10px;
      align-items: center;
      gap: 10px;
      align-self: stretch;
      border-radius: 3px;
      background: var(--primary, #676f9d);
      border: none;
      font-size: 24px;
      color: #fff;
    }

    &_input::placeholder {
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      font-family: Lato;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  &-submit {
    display: flex;
    padding-top: 45px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    &-btn {
      display: flex;
      padding: 10px;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 10px;
      border-radius: 5px;
      background: var(--accent, #f9b17a);
      border: none;

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
</style>