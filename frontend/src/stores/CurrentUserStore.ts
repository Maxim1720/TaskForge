import { defineStore } from "pinia";
import { SessionStorageKeys, Token, User, UserAuthorization, UserCurrent } from "../definition/User";


// const router = useRouter();

export const useCurrentUserStore = defineStore("currentUserStore", {
    state: (): { user: UserCurrent } => ({
        user: {
            username: "",
            id: -1
        }
    }),
    getters: {
        isAuthorized: function(): boolean {
            return this.user.id !== -1;
        },
        me: function():UserCurrent {
            if (this.isAuthorized) {
                return this.user;
            }
            const fetchMe = async () => {
                const resp = await fetch("/api/auth/me", {
                    headers: {
                        "Authorization": sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || ""
                    },
                    method: "POST"
                });
                const json = await resp.json();
                this.user = {
                    username: json.username,
                    id: json.id
                }
            };
            fetchMe();
            return this.user;
        }
    }
});