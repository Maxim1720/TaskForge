import { defineStore } from "pinia"
import { Task } from "../definition/Task";
import { SessionStorageKeys } from "../definition/User";
import { parseData } from "../utils/jsonDataParser";

const request = {
    headers: {
        "Authorization": sessionStorage.getItem(SessionStorageKeys.AUTH_KEY) || ""
    },
};

const projectTasksGetRequest = async (projectId: number, params: URLSearchParams) => {
    console.log(`api/projects/${projectId}/tasks?` + params);

    const response = await fetch(`/api/projects/${projectId}/tasks?${params}`, {
        headers: { ...request.headers },
        method: "GET",
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    return parseData(json) as Task[];
}

const projectTasksChangeRequest = async (task: Task, params: URLSearchParams, method: string) => {
    const resp = await fetch(`/api/projects/${task.projectId}/tasks` + params, {
        headers: {
            ...request.headers
        },
        body: JSON.stringify(task),
        method: method
    });
    if(!resp.ok){
        return await resp.json().then(json => { throw new Error(json); });
    }
    const json = await resp.json();
    return parseData(json);
}

export const useTaskStore = defineStore("taskStore", {
    state: (): { all: Task[] } => ({
        all: []
    }),
    actions: {
        async deleteTask(task: Task) {
            return projectTasksChangeRequest(task, new URLSearchParams(task.id.toString()), "DELETE");
        },
        async doneTask(task: Task) {
            return projectTasksChangeRequest(task, new URLSearchParams(), "PUT");
        },
        async getTask(projectId: number, id: number) {
            const resp = await fetch(`/api/projects/${projectId}/tasks/${id}`, {
                headers: { ...request.headers },
                method: "GET"
            });
            const json = await resp.json();
            return parseData(json);
        },
        async addTask(task: Task) {
           return projectTasksChangeRequest(task, new URLSearchParams(), "POST");
        },
        async getProjectTasks(projectId: number) {
            return projectTasksGetRequest(projectId, new URLSearchParams());
        },
        async getDoneTasks(projectId: number) {
            return projectTasksGetRequest(projectId, new URLSearchParams({ isDone: "true" }));
        },
        async getUndoneTasks(projectId: number) {
            return projectTasksGetRequest(projectId, new URLSearchParams({ isDone: "false" }));
        }
    },
});