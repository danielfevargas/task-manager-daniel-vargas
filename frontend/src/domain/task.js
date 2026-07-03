export const TASK_PRIORITY = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
};

export const TASK_STATUS = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
};

export const PRIORITY_LABELS = {
    [TASK_PRIORITY.HIGH]: "Alta",
    [TASK_PRIORITY.MEDIUM]: "Media",
    [TASK_PRIORITY.LOW]: "Baja",
};

export const STATUS_LABELS = {
    [TASK_STATUS.PENDING]: "Pendiente",
    [TASK_STATUS.IN_PROGRESS]: "En progreso",
    [TASK_STATUS.COMPLETED]: "Completada",
};

// Colores por prioridad, como pide el PDF ("Visual diferenciado: rojo, amarillo, verde")
export const PRIORITY_COLORS = {
    [TASK_PRIORITY.HIGH]: "#e53e3e",
    [TASK_PRIORITY.MEDIUM]: "#d69e2e",
    [TASK_PRIORITY.LOW]: "#38a169",
};