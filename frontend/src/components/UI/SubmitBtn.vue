<template>
    <input class="submit-btn" type="submit" :value="$props.value" />
</template>

<script lang="ts" setup>
defineProps(["value", "onClick"]);
</script>

<style scoped lang="scss">
.submit-btn {
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

  &:active{
    color: #fff;
    box-shadow: 0px 0px 12px 0px #fff inset;
  }
}
</style>