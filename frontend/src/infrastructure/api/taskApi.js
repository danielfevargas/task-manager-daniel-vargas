const BASE_URL = "http://localhost:3000/api";

async function handleResponse(response) {
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || `Error ${response.status}`);
    }
    if (response.status === 204) return null; 
    return response.json();
}

export const taskApi = {
    async getAll(filters = {}) {
        const params = new URLSearchParams();
        if (filters.status) params.append("status", filters.status);
        if (filters.priority) params.append("priority", filters.priority);

        const response = await fetch(`${BASE_URL}/tasks?${params}`);
        return handleResponse(response);
    },

    async getById(taskId) {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`);
        return handleResponse(response);
    },

    async create(taskData) {
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });
        return handleResponse(response);
    },

    async update(taskId, changes) {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changes),
        });
        return handleResponse(response);
    },

    async delete(taskId) {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: "DELETE",
        });
        return handleResponse(response);
    },
};