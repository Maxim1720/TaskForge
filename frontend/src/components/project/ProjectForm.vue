<template>
  <form class="form" @submit.prevent="$emit('submit', formData)">
    <div class="form-title">Новый проект</div>
    <div class="form-inputs">
      <FormTextInput inputName="name" :inputValue="formData.name" inputPlaceholder="Название" @valueChanged="input" />
      <FormTextInput inputName="description" :inputValue="formData.description" inputPlaceholder="Описание"
        @valueChanged="input" />
      <div class="form-inputs_deadline">
        <div class="form-inputs_deadline-label">Дедлайн</div>
        <input type="datetime-local" name="expiryAt" class="form-inputs_deadline-input" :value="formData.expiryAt"
          @input="input" />
      </div>

      <div class="form-inputs_deadline">
        <div class="form-inputs_deadline-label">
          <input type="checkbox" :value="formData.isPublic" name="isPublic" @input="(e)=>{
            const target = e.target as HTMLInputElement;
            target.value = String(target.checked);
            input(e);
          }"/>
          Публичный
        </div>
      </div>
      <div class="form-inputs_submit">
        <submit-btn />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { Project } from "../../definition/Project";
import FormTextInput from "../UI/FormTextInput.vue";
import SubmitBtn from "../UI/SubmitBtn.vue";
import { UserCurrent } from "../../definition/User";
import { ref } from "vue";

const props = defineProps<{ owner: UserCurrent }>();
const submitEmit = defineEmits<{
  submit: [value: Project];
}>();

const formData = ref<Project>({
  id: Date.now() + Math.floor((Math.random() % 1500) + 1),
  name: "",
  description: "",
  expiryAt: undefined,
  ownerId: props.owner.id,
  isPublic: false
});
console.log(formData);
const input = (e: Event) => {
  console.log(e);
  const target = e.target as HTMLInputElement;
  const name = target.name;
  const val = target.value;
  console.log( name + " " + val);
  formData.value[target.name]  = target.value;
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  width: 575px;
  // height: 553px;
  padding: 29px 10px;
  flex-direction: column;
  align-items: center;
  gap: 62px;
  border-radius: 9px;
  background: var(--Page, #2d3250);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

  &-title {
    display: flex;
    width: 511px;
    padding: 9px 0px;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
    flex: 1 0 0;
    align-self: stretch;

    &_deadline {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      align-self: stretch;

      &-label {
        color: rgba(255, 255, 255, 0.5);
        font-family: Lato;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        align-self: stretch;
      }

      &-input {
        display: flex;
        padding: 10px;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        border-radius: 3px;
        background: var(--primary, #676f9d);
        border: none;
        font-size: 16px;
        color: #fff;

        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
          font-family: Lato;
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }

    &_submit {
      display: flex;
      padding-top: 45px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      align-self: stretch;
    }
  }
}
</style>