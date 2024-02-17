import { SessionStorageKeys, Token, UserAuthorization, UserCurrent } from "../definition/User";

export const login = (user: UserAuthorization) => {

    const setAuth = (tokenResponse: Token) => {
        sessionStorage.setItem(
            SessionStorageKeys.AUTH_KEY,
            tokenResponse.tokenType + " " + tokenResponse.accessToken
        );
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
    fetch("/api/auth/logout", {
        method: "POST",
        headers: {
            Authorization: sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || "",
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
    });
}

export const fetchMe = (): Promise<UserCurrent> => {

    return fetch("/api/auth/me", {
        method: "POST",
        headers: {
            Authorization:
                sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || "",
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