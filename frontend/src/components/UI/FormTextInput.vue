<template>
  <input
    type="text"
    :name="$props.inputName"
    :value="$props.inputValue"
    @input="(e) => $emit('valueChanged', e)"
    :placeholder="$props.inputPlaceholder"
  />
</template>

<script lang="ts" setup>
defineProps(["inputName", "inputValue", "inputPlaceholder"]);
</script>

<style lang="scss" scoped>
input {
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

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-family: Lato;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
