import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/TaskList";
import { TaskFilters } from "../components/TaskFilters";
import { TaskForm } from "../components/TaskForm";
import { PokemonForm } from "../components/PokemonForm";


export function TasksPage() {
    const { tasks, loading, error, filters, setFilters, createTask, updateTask, deleteTask } = useTasks();
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showPokemonForm, setShowPokemonForm] = useState(false);

    const stats = {
        pending: tasks.filter((t) => t.status === "pending").length,
        inProgress: tasks.filter((t) => t.status === "in_progress").length,
        completed: tasks.filter((t) => t.status === "completed").length,
    };
    

    const openPokemonForm = () => {
        setShowPokemonForm(true);
    };

    const closePokemonForm = () => {
        setShowPokemonForm(false);
    };

    const openCreateForm = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const openEditForm = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const handleSubmit = async (formData) => {
        const payload = {
            title: formData.title,
            description: formData.description || null,
            dueDate: formData.dueDate || null,
            priority: formData.priority,
            status: formData.status,
            userEmail: "danielfevargas16@gmail.com",
        };

        if (editingTask) {
            await updateTask(editingTask.task_id, payload);
        } else {
            await createTask(payload);
        }
        closeForm();
    };

    const handleDelete = async (taskId) => {
        if (confirm("¿Eliminar esta tarea?")) {
            await deleteTask(taskId);
        }
    };

    const handleToggleComplete = async (task) => {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        await updateTask(task.task_id, { status: newStatus });
    };

    return (
        <div className="tasks-page">
            <header className="tasks-header">
                <div>
                    <h1>Gestión de Tareas</h1>
                    <p>Organiza y administra tus tareas de forma eficiente</p>
                </div>
                <button className="btn-primary" onClick={openCreateForm}>+ Nueva Tarea</button>
                <button className="btn-primary" onClick={openPokemonForm}>+ Pokemon</button>
            </header>

            <TaskFilters filters={filters} onChange={setFilters} />

            {loading && <p>Cargando tareas…</p>}
            {error && <p className="form-error">Error: {error}</p>}

            {!loading && !error && (
                <TaskList
                    tasks={tasks}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                    onToggleComplete={handleToggleComplete}
                />
            )}

            <section className="stats">
                <div><strong>{stats.pending}</strong><span>Pendientes</span></div>
                <div><strong>{stats.inProgress}</strong><span>En Progreso</span></div>
                <div><strong>{stats.completed}</strong><span>Completadas</span></div>
            </section>

            {showForm && (
                <div className="modal-overlay" onClick={closeForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <TaskForm initialTask={editingTask} onSubmit={handleSubmit} onCancel={closeForm} />
                    </div>
                </div>
            )}

            {showPokemonForm && (
                <div className="modal-overlay" onClick={closePokemonForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <PokemonForm onCancel={closePokemonForm} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TasksPage;