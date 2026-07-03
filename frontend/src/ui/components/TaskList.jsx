import { TaskCard } from "./TaskCard";

export function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
    if (tasks.length === 0) {
        return <p className="empty-state">No hay tareas que coincidan con los filtros. ¡Crea una! 🎉</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard key={task.task_id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
            ))}
        </div>
    );
}