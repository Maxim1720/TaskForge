<template>
    <span>{{ me.username }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserCurrent } from '../../definition/User';
import { fetchMe, logout } from '../../utils/auth';
import { useRouter } from 'vue-router';
import { AppPaths } from '../../definition/Paths';

const router = useRouter();
const me = ref<UserCurrent>({
    username: "",
    id: -1,
});

try {
    const meFetched = await fetchMe();
    me.value = await fetchMe();
    console.log(meFetched);
}
catch (error) {
    console.log(error);
    logout();
    router.push(AppPaths.AUTHORIZATION);
}

</script>