import { defineStore } from "pinia";
import { Project } from "../definition/Project";
import { useAuthTokenStore } from "./AuthTokenStore";


export const useProjectStore = defineStore("projectStore", {
    state: (): { projects: Project[] } => ({
        projects: []
    }),
    actions: {
        async add(p: Project) {
            return await fetch("/api/projects", {
                headers: {
                    "Authorization": useAuthTokenStore().tokenForAuth()
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
                    "Authorization": useAuthTokenStore().tokenForAuth()
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
                    "Authorization": useAuthTokenStore().tokenForAuth()
                },
                method: "GET"
            });
            const json = await resp.json();
            return [...json.data];

        }
    },
    
});