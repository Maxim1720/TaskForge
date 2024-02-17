
export type UserRegistration = {
    email: string,
    password: string,
    username: string
};

export type UserAuthorization = {
    email: string,
    password: string
};

export type UserCurrent = {
    id: number,
    username: string
}

export type User = {
    id: number,
    email : string,
    password: string,
    username: string,
}

export enum SessionStorageKeys {
    AUTH_KEY = "auth-key",
}

export type Token = {
    accessToken: string,
    tokenType: string,
    expiresIn: number
}