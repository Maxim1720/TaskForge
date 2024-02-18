import { defineStore } from "pinia";
import { SessionStorageKeys, Token } from "../definition/User";


export const useAuthTokenStore = defineStore("authTokenStore", {
    state: (): { token: Token } => ({
        token: {
            tokenType: "",
            accessToken: "",
            expiresIn: -1
        }
    }),
    actions: {
        removeToken: function () {
            this.token = {
                accessToken: "",
                expiresIn: -1,
                tokenType: ""
            }
            sessionStorage.removeItem(SessionStorageKeys.AUTH_KEY)
        },
        setToken: function (token: Token) {
            sessionStorage.setItem(
                SessionStorageKeys.AUTH_KEY,
                token.tokenType + " " + token.accessToken
            );
            this.getToken();
        },

        tokenForAuth: function (): string {
            return this.getToken().tokenType + this.getToken().accessToken;
        },

        getToken: function (): Token {
            const t = sessionStorage.getItem(SessionStorageKeys.AUTH_KEY)?.split(' ') || ["", ""];
            this.token = {
                tokenType: t[0],
                accessToken: t[1],
                expiresIn: -1
            };
            return this.token;
        }
    }
});