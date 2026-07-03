import { useState, useEffect, useCallback } from "react";
import { taskApi } from "../../infrastructure/api/taskApi";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ status: "", priority: "" });

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskApi.getAll(filters);
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const createTask = async (taskData) => {
        const newTask = await taskApi.create(taskData);
        setTasks((prev) => [...prev, newTask]);
        return newTask;
    };

    const updateTask = async (taskId, changes) => {
        const updated = await taskApi.update(taskId, changes);
        setTasks((prev) => prev.map((t) => (t.task_id === taskId ? updated : t)));
        return updated;
    };

    const deleteTask = async (taskId) => {
        await taskApi.delete(taskId);
        setTasks((prev) => prev.filter((t) => t.task_id !== taskId));
    };

    return {
        tasks,
        loading,
        error,
        filters,
        setFilters,
        createTask,
        updateTask,
        deleteTask,
        refetch: fetchTasks,
    };
}