<template>
  <span class="logo"><span class="logo-text">Task</span><span class="logo-text">Forge</span></span>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.logo {

  cursor: default;
  display: flex;
  width: 284px;
  height: 69px;
  justify-content: center;
  align-items: center;
//   flex-shrink: 0;
  text-shadow: 0px 4px 20px rgba(255, 255, 255, 0.5);
  text-align: center;

  li{
    list-style: none;
  }

  &-text {
    
    cursor: default;
    color: var(--Color, #fff);
    font-family: Roboto;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 5.76px;

    -webkit-text-stroke-width: 2px #2d3250;
    // -webkit-text-stroke-color: var(--Page, );

    &::first-letter {
      color: var(--accent, #f9b17a);
      font-family: Roboto;
      font-size: 32px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 5.76px;
    }
  }
}



</style>