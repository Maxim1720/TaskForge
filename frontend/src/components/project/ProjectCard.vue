<template>
  <div class="card" @click="$emit('open', $props.project.id)">
    <div class="card-name">{{ $props.project.name }}</div>
    <div class="card-description">{{ $props.project.description }}</div>
    <div class="card-expire">
      {{ formattedExpiryDate }}
    </div>
    <div class="card-owner" v-if="user">
      {{ user.username }}
    </div>
    <div class="card-is_public" v-else>
      {{ $props.project.isPublic ? "Публичный" : "Приватный" }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';


defineEmits(["open"]);
const props = defineProps(
  ["project", "user"]
);

const formattedExpiryDate = computed(() => {
  const expiryDate = props.project.expiryAt;
  if (expiryDate) {
    return expiryDate
      .toLocaleString()
      .replace("T", " ")
      .split(new RegExp("[-]"))
      .join("/");
  }
  return "";
});
</script>


<style lang="scss" scoped>
.card {
  display: flex;
  width: 340px;
  height: 275px;
  padding: 21px 10px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  border-radius: 12px;
  border: 1px solid var(--secondary, #424769);
  background-color: rgb(45, 50, 80); 
  box-shadow: 0px 0px 12px 0px var(--primary, #676f9d) inset;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 24px 0px var(--primary, #676f9d) inset;
  }

  &-name {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background-color: rgba(103, 111, 157, 0.1);
    color: var(--white, #fff);
    text-align: center;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 116.667%;
    /* 28px */
  }

  &-description {
    display: flex;
    padding: 10px;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    flex-wrap: wrap;
    color: var(--white, #fff);
    font-family: Raleway;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    word-break: break-all;
  }

  &-expire {
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    color: var(--white, #fff);
    text-align: right;
    font-family: Raleway;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-self: flex-end;
    // text-align: end;
  }

  &-is_public{
    color: #F9B17A;
    font-weight: bold;
    font-family: Raleway;
    font-size: 14px;
  }

  &-owner{
    font-size: 18px;
    font-weight: 700;
    font-family: Raleway;
    letter-spacing: 2px;
    color: #F9B17A;
    background-color: rgb(66, 71, 105, 0.25);
    border-radius: 2px;
    width: 100%;
    text-align: center;
  }
}


</style>