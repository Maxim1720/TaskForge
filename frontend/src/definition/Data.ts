
export interface Data {
    data: any,
    status: string,
    message: string
}

export enum ResponseStatuses {
    OK="ok",
    ERROR="error"
}