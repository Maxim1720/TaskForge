import { defineStore } from "pinia";
import { Project } from "../definition/Project";
import { useAuthTokenStore } from "./AuthTokenStore";


export const useProjectStore = defineStore("projectStore", {
    state: (): { projects: Project[], publicProjects: Project[] } => ({
        projects: [],
        publicProjects: []
    }),
    actions: {
        async add(p: Project) {
            return await fetch("/api/projects", {
                headers: {
                    "Authorization": useAuthTokenStore().tokenForAuth(),
                    "Accept":"application/json"
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
                .then(json=>{
                    const project = json.data as Project
                    this.projects.push(project);
                    return project;
                });
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
                    this.publicProjects = [...json.data];
                    return this.publicProjects;
                });
        },

        async getCurrentUserProjects(): Promise<Project[]>{
            const resp = await fetch("/api/" + "projects?filter=my", {
                headers: {
                    "Authorization": useAuthTokenStore().tokenForAuth(),
                    "Accept":"application/json"
                },
                method: "GET"
            });
            const json = await resp.json();
            console.log(json);
            this.projects = [...json.data];
            return this.projects;

        }
    },
    
});