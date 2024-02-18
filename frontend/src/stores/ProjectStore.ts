import { defineStore } from "pinia";
import { Project } from "../definition/Project";
import { SessionStorageKeys } from "../definition/User";



export const useProjectStore = defineStore("projectStore", {
    state: (): { projects: Project[] } => ({
        projects: []
    }),
    actions: {
        async add(p: Project) {
            return await fetch("/api/projects", {
                headers: {
                    "Authorization": sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || ""
                },
                body: JSON.stringify({
                    ...p
                }),
                method: "POST"
            })
                .then(resp => {
                    if (!resp.ok) {
                        alert("Не удалось создать проект");
                    }
                    return resp;
                })
                .then(resp=>resp.json())
                .then(json=>json.data as Project);
        },

        async getPublic(): Promise<Project[]> {
            return fetch("/api/" + "projects?filter=public", {
                method: "GET",
                headers:{
                    "Authorization": sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || ""
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    this.projects = [...json.data];
                    return [...json.data];
                });
        },

        async getCurrentUserProjects(): Promise<Project[]>{
            const resp = await fetch("/api/" + "projects?filter=my", {
                headers: {
                    "Authorization": sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || ""
                },
                method: "GET"
            });
            const json = await resp.json();
            return [...json.data];

        }
    },
    
});