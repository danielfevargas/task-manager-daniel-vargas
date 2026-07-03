import { PRIORITY_LABELS, STATUS_LABELS, PRIORITY_COLORS } from "../../domain/task";
import { CountdownTimer } from "./CountdownTimer";

export function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
    const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== "completed";
    const isCompleted = task.status === "completed";

    return (
        <div className={`task-card ${isCompleted ? "task-card-completed" : ""}`} style={{ borderLeftColor: PRIORITY_COLORS[task.priority] }}>
            <div className="task-card-header">
                <div className="task-card-title-row">
                    <button
                        className={`check-circle ${isCompleted ? "checked" : ""}`}
                        onClick={() => onToggleComplete(task)}
                        aria-label="Marcar como completada"
                    >
                        {isCompleted && "✓"}
                    </button>
                    <h3 className={isCompleted ? "strikethrough" : ""}>{task.title}</h3>
                </div>
                <div className="task-card-side">
                    {task.due_date && !isCompleted && <CountdownTimer dueDate={task.due_date} />}
                    <div className="task-card-actions">
                        <button onClick={() => onEdit(task)} aria-label="Editar tarea">✏️</button>
                        <button onClick={() => onDelete(task.task_id)} aria-label="Eliminar tarea">🗑️</button>
                    </div>
                </div>
            </div>

            {task.description && (
                <p className="task-card-description">
                    {task.description.length > 120
                        ? task.description.slice(0, 120) + "…"
                        : task.description}
                </p>
            )}

            <div className="task-card-footer">
                {task.due_date && (
                    <span className={isOverdue ? "task-due overdue" : "task-due"}>
                        📅 {new Date(task.due_date).toLocaleDateString("es-CO")}
                    </span>
                )}
                <span className="badge" style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}>
                    {PRIORITY_LABELS[task.priority]}
                </span>
                <span className={`badge status-${task.status}`}>
                    {STATUS_LABELS[task.status]}
                </span>
            </div>
        </div>
    );
}