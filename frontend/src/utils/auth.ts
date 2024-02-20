import { Token, UserAuthorization, UserCurrent } from "../definition/User";
import { useAuthTokenStore } from "../stores/AuthTokenStore";



export const login = async (user: UserAuthorization) => {

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

    let resp1 = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
    });
    if (resp1.status === 401) {
        throw new Error("Неверный логин или пароль");
    }
    else if(resp1.status === 400){
        return resp1.json();
    }
    let resp2: Response = resp1;
    let json: any = await resp2.json();
    setAuth(json);
    onLoginDone();
    return json;
}

export const logout = async () => {
    const authTokenStore = useAuthTokenStore();
    try {
        let resp = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                Authorization: authTokenStore.tokenForAuth(),
            },
        });
        console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return Promise.reject(error); // Пробрасываем ошибку дальше
    } finally {
        console.log("finally");
        authTokenStore.removeToken();
        document.dispatchEvent(
            new CustomEvent<boolean>("authenticated", {detail: false})
        );
    }
}

export const fetchMe = async (): Promise<UserCurrent> => {
    const authTokenStore = useAuthTokenStore();
    const resp = await fetch("/api/auth/me", {
        method: "POST",
        headers: {
            "Authorization": authTokenStore.tokenForAuth()
        },
    });
    if(!resp.ok){
        throw new Error(await resp.json().then(json=>json.message));
    }
    const json = await resp.json();
    console.log(json);
    return {
        ...json.data
    };
}