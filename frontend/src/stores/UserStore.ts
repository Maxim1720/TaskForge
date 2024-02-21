import {defineStore} from "pinia";
import {User} from "../definition/User.ts";
import {useAuthTokenStore} from "./AuthTokenStore.ts";


export const useUserStore = defineStore("userStore", {

    actions:{
        async getById(id: number) : Promise<User>{

            const resp= await fetch("/api/users/"+id, {
                headers:{
                    Authorization: useAuthTokenStore().tokenForAuth(),
                    Accept: "application/json"
                },
                method: "GET"
            })
            const json = await resp.json();
            console.log(json)
            return json.data as User;
        }
    }
})