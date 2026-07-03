import { useState } from "react";
import { TASK_PRIORITY, TASK_STATUS, PRIORITY_LABELS, STATUS_LABELS } from "../../domain/task";

const emptyForm = {
    title: "",
    description: "",
    dueDate: "",
    priority: TASK_PRIORITY.MEDIUM,
    status: TASK_STATUS.PENDING,
};

export function TaskForm({ initialTask, onSubmit, onCancel }) {
    const [form, setForm] = useState(
        initialTask
            ? {
                  title: initialTask.title,
                  description: initialTask.description || "",
                  dueDate: initialTask.due_date || "",
                  priority: initialTask.priority,
                  status: initialTask.status,
              }
            : emptyForm
    );
    const [error, setError] = useState(null);

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await onSubmit(form);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>{initialTask ? "Editar tarea" : "Nueva tarea"}</h2>

            {error && <p className="form-error">{error}</p>}

            <label>
                Título *
                <input
                    type="text"
                    value={form.title}
                    onChange={handleChange("title")}
                    maxLength={150}
                    required
                />
            </label>

            <label>
                Descripción
                <textarea
                    value={form.description}
                    onChange={handleChange("description")}
                    maxLength={1000}
                    rows={3}
                />
            </label>

            <label>
                Fecha de vencimiento
                <input type="date" value={form.dueDate} onChange={handleChange("dueDate")} />
            </label>

            <label>
                Prioridad
                <select value={form.priority} onChange={handleChange("priority")}>
                    {Object.values(TASK_PRIORITY).map((p) => (
                        <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
                    ))}
                </select>
            </label>

            <label>
                Estado
                <select value={form.status} onChange={handleChange("status")}>
                    {Object.values(TASK_STATUS).map((s) => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                </select>
            </label>

            <div className="form-actions">
                <button type="button" onClick={onCancel}>Cancelar</button>
                <button type="submit">{initialTask ? "Guardar cambios" : "Crear tarea"}</button>
            </div>
        </form>
    );
}