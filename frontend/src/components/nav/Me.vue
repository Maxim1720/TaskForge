<template>
    <span>{{ me.username }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SessionStorageKeys, UserCurrent } from '../../definition/User';
import { fetchMe } from '../../utils/auth';
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
    router.push(AppPaths.AUTHORIZATION);

    await fetch("/api/auth/refresh",
        {
            headers: {
                "Authorization": sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || ""
            },
            method: "POST"
        })
        .then(resp => resp.json())
        .then(json => {
            sessionStorage.setItem(SessionStorageKeys.AUTH_KEY, json.accessToken);
            fetchMe().then(val => me.value = val);
        });
}

</script>