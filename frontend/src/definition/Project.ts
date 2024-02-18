import { UserCurrent } from "./User";

export type Project = {
    
    [key: string]: any;
    
    id?: number,
    name: string,
    description: string
    expiryAt?: Date | string,
    ownerId: number,
    isPublic: boolean
};

export type ProjectWithUser = {
    project: Project;
    user: UserCurrent;
};

export type ProjectWithoutUser = {
    id?: number,
    name: string,
    description: string
    expiryAt?: Date | string,
    isPublic: boolean
}
