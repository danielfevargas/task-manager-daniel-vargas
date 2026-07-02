const TASK_PRIORITY = Object.freeze({
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
});

const TASK_STATUS = Object.freeze({
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
});

export class Task {
    constructor({ taskId, title, description, dueDate, priority, status,
        originFramework, userEmail, createdAt, updatedAt }) {

        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ?? null;
        this.priority = priority ?? TASK_PRIORITY.MEDIUM;
        this.status = status ?? TASK_STATUS.PENDING;
        this.originFramework = originFramework;
        this.userEmail = userEmail;
        this.createdAt = createdAt ?? new Date().toISOString();
        this.updatedAt = updatedAt ?? new Date().toISOString();
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (!value || value.trim().length === 0) {
            throw new Error("El título es obligatorio.");
        }
        if (value.length > 150) {
            throw new Error("El título no puede superar los 150 caracteres.");
        }
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        if (value && value.length > 1000) {
            throw new Error("La descripción no puede superar los 1000 caracteres.");
        }
        this._description = value ?? null;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        if (!Object.values(TASK_PRIORITY).includes(value)) {
            throw new Error(`Prioridad inválida: ${value}`);
        }
        this._priority = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        if (!Object.values(TASK_STATUS).includes(value)) {
            throw new Error(`Estado inválido: ${value}`);
        }
        this._status = value;
    }

    update({ title, description, dueDate, priority, status }) {
        if (title !== undefined) this.title = title;
        if (description !== undefined) this.description = description;
        if (dueDate !== undefined) this.dueDate = dueDate;
        if (priority !== undefined) this.priority = priority;
        if (status !== undefined) this.status = status;
        this.updatedAt = new Date().toISOString();
    }

    toJSON() {
        return {
            task_id: this.taskId,
            title: this.title,
            description: this.description,
            due_date: this.dueDate,
            priority: this.priority,
            status: this.status,
            origin_framework: this.originFramework,
            user_email: this.userEmail,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }
}

export { TASK_PRIORITY, TASK_STATUS };