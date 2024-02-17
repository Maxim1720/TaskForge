
export type Task = {
    id: number
    title: string;
    expiryAt?: Date;
    done: boolean,
    projectId: number
};