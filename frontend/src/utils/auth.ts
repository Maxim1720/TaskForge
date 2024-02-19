import { Token, UserAuthorization, UserCurrent } from "../definition/User";
import { useAuthTokenStore } from "../stores/AuthTokenStore";



export const login = (user: UserAuthorization) => {

    const authTokenStore = useAuthTokenStore();
    const setAuth = (tokenResponse: Token) => {
        authTokenStore.setToken(tokenResponse);
    };
    function onLoginDone(this: any) {
        document.dispatchEvent(
            new CustomEvent<boolean>("authenticated", {
                detail: true,
            })
        );

    }
    return fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
    })
        .then((resp) => {
            if (resp.status === 401) {
                throw new Error("Неверный логин или пароль");
            }
            return resp;
        })
        .then((resp) => resp.json())
        .then((json) => {
            setAuth(json);
            onLoginDone();
        })
}

export const logout = () => {
    const authTokenStore = useAuthTokenStore();
    fetch("/api/auth/logout", {
        method: "POST",
        headers: {
            Authorization: authTokenStore.tokenForAuth(),
        },
    }).then((resp) => {
        if (resp.ok) {

            sessionStorage.removeItem(SessionStorageKeys.AUTH_KEY);
            document.dispatchEvent(
                new CustomEvent<boolean>("authenticated", { detail: false })
            );
        } else {
            alert("Не могу выйти");
        }
        authTokenStore.removeToken();
    });
}

export const fetchMe = (): Promise<UserCurrent> => {

    return fetch("/api/auth/me", {
        method: "POST",
        headers: {
            "Authorization": authTokenStore.tokenForAuth()
        },
    })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            
            return {
                ...json.data
            }
        });
}