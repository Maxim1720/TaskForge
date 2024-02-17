<template>
    <div :class="'p-4 mb-4 text-md '
        + (danger ? ' text-red-800' : ' text-blue-800')
        + ' rounded-lg'
        + ' bg-red-50'
        // + ' dark:#676F9D'
        + ' dark:text-red-400'
        + ' role=alert'
        + ' text-wrap'
        ">
        <span class="font-medium">{{ message }}</span>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ message: string, danger: boolean }>();
</script>
