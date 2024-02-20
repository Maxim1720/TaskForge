import {defineStore} from "pinia"
import {Task} from "../definition/Task";
import {parseData} from "../utils/jsonDataParser";
import {useAuthTokenStore} from "./AuthTokenStore";

const authTokenStoreWrapper = () => {
    return useAuthTokenStore();
}

const getTasksPath = (projectId: number): string => {
    return `/api/projects/${projectId}/tasks`;
}

const request = {
    headers: {
        "Authorization": authTokenStoreWrapper().tokenForAuth(),
        "Accept": "application/json"
    },
};

const projectTasksGetRequest = async (projectId: number, params: URLSearchParams) => {
    // console.log(`api/projects/${projectId}/tasks?` + params);

    const response = await fetch(`/api/projects/${projectId}/tasks?${params}`, {
        headers: {...request.headers},
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
    if (!resp.ok) {
        return await resp.json().then(json => {
            throw new Error(json);
        });
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
            console.log(task);
            const resp = await fetch(getTasksPath(task.projectId) + `/${task.id}`, {
                headers: {
                    ...request.headers
                },
                method: "DELETE"
            });
            return await resp.json();
        },
        async doneTask(task: Task) {
            task.done = !task.done;
            const url = (getTasksPath(task.projectId)+`/${task.id}/done`);
            console.log(url);
            const resp = await fetch(url, {
                headers: {
                    ...request.headers
                },
                method: "POST",
                body: JSON.stringify(task)
            });
            return await resp.json();
        },
        async getTask(projectId: number, id: number) {
            const resp = await fetch(`/api/projects/${projectId}/tasks/${id}`, {
                headers: {...request.headers},
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
            return projectTasksGetRequest(projectId, new URLSearchParams({isDone: "true"}));
        },
        async getUndoneTasks(projectId: number) {
            return projectTasksGetRequest(projectId, new URLSearchParams({isDone: "false"}));
        }
    },
});