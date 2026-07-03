import { TASK_STATUS, TASK_PRIORITY, STATUS_LABELS, PRIORITY_LABELS } from "../../domain/task";

export function TaskFilters({ filters, onChange }) {
    return (
        <div className="task-filters">
            <select
                value={filters.status}
                onChange={(e) => onChange({ ...filters, status: e.target.value })}
            >
                <option value="">Todas</option>
                {Object.values(TASK_STATUS).map((status) => (
                    <option key={status} value={status}>
                        {STATUS_LABELS[status]}
                    </option>
                ))}
            </select>

            <select
                value={filters.priority}
                onChange={(e) => onChange({ ...filters, priority: e.target.value })}
            >
                <option value="">Todas las prioridades</option>
                {Object.values(TASK_PRIORITY).map((priority) => (
                    <option key={priority} value={priority}>
                        {PRIORITY_LABELS[priority]}
                    </option>
                ))}
            </select>
        </div>
    );
}