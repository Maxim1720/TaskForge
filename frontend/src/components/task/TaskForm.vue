<template>
  <form class="form" @submit.prevent="()=>{$emit('onAddTask', formData); afterSubmit()}">
    <textarea
        class="text-input data-input"
        name="title"
        v-model="formData.title"

        placeholder="Новая задача"
    >

<!--      @input="(e: Event) => {-->
<!--        const target = e.target as HTMLInputElement;-->
<!--        formData.title = target.value;-->
<!--      }"-->

    </textarea>
    <div
        :class="[
        'date-picker-section',
        formData.expiryAt ? 'date-picker-section-active' : '',
      ]"
    >
      <div class="date-picker-title">Выполнить до</div>
      <input
         v-model="formData.expiryAt"
          class="date-picker data-input"
          type="datetime-local"
      />
<!--
 v-bind:value="formData.expiryDate"
          @input="(e) => {
          const target = e.target as HTMLInputElement;
          formData.expiryDate = new Date(target.value);
        }"
-->

    </div>
    <button class="save-btn" type="submit">Добавить задачу</button>
  </form>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const formData = ref<{ title: string; expiryAt?: Date }>({
  title: "",
});
const afterSubmit = () => {
  formData.value.title = "";
  formData.value.expiryAt = undefined;
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  width: 638px;
  height: 294.051px;
  padding: 32px 66px 17px 66px;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  border-radius: 20px;
  background: #424769;

  box-shadow: 0px 0px 50px -20px black;
}


.text-input {
  resize: none;
  display: flex;
  height: 116px;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;

  //   border-radius: 3px;
  border-radius: 12px;

  font-family: Verdana, Geneva, Tahoma, "Segoe UI", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #fff;
  border: none;
}

.data-input {
  background: #676f9d;
}

.text-input::placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  //   align-self: stretch;
  text-align: center;
  vertical-align: middle;

  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-family: "Raleway";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 4em;
}

.date-picker-section {
  display: flex;
  width: 506px;
  height: 75px;
  padding: 10px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  flex-shrink: 0;
  opacity: 50%;
  transition-duration: 0.3s;

  &-active {
    opacity: 100%;
  }

  &:hover {
    opacity: 100%;
  }
}

.date-picker {
  display: flex;
  width: 170px;
  height: 30px;
  padding: 2px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  border: none;
  color: #fff;
  text-align: center;
  font-family: "Raleway";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition-duration: 0.3s;

  &-title {
    transition-duration: 0.3s;
    color: #fff;
    // opacity: 50%;
    font-family: Raleway;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

.save-btn {
  display: flex;
  width: 179.5px;
  height: 38.051px;
  padding: 8.272px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8.272px;
  flex-shrink: 0;

  border-radius: 22.334px;
  background: #f9b17a;

  color: #2d3250;
  text-align: center;
  font-family: Raleway;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border: none;
}
</style>