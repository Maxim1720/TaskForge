import { defineStore } from "pinia";
import { SessionStorageKeys, User, UserAuthorization, UserCurrent } from "../definition/User";

export const useUserStore = defineStore("userStore", {
    state: (): { users: User[] } => ({
        users: []
    }),
    actions: {
        add(u: User) {
            this.users.push(u);
            console.log(this.users);
        },
        exists(username: string) {
            return this.users.find(u => u.username === username) !== undefined;
        },
        authenticate(u: UserAuthorization) {
            console.log(u);
            const founded = this.users.find(user => (user.username == u.email && user.password == u.password))
            console.log(founded);
            return founded !== undefined;
        }
    },
    getters: {
        getCurrentUser(): UserCurrent | undefined {
            const sessionData = sessionStorage.getItem(SessionStorageKeys.AUTH_KEY);
            if (!sessionData) {
                return;
            }
            const userData = sessionData.split(" ");
            const userFromState = this.users.find(u => u.username === userData[0])
            if (!userFromState) {
                return;
            }
            const user: UserCurrent = {
                username: userFromState.username
            };
            return user;
        },
    }
});