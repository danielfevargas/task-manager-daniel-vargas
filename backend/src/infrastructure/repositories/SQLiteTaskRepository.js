import { ITaskRepository } from "../../domain/ITaskRepository.js";
import { Task } from "../../domain/task.js";
import db from "../database/connection.js";

export class SQLiteTaskRepository extends ITaskRepository {

    #rowToTask(row) {
        return new Task({
            taskId: row.task_id,
            title: row.title,
            description: row.description,
            dueDate: row.due_date,
            priority: row.priority,
            status: row.status,
            originFramework: row.origin_framework,
            userEmail: row.user_email,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        });
    }

    async create(task) {
        const data = task.toJSON();

        db.prepare(`
            INSERT INTO tasks (task_id, title, description, due_date, priority, status, origin_framework, user_email, created_at, updated_at)
            VALUES (:task_id, :title, :description, :due_date, :priority, :status, :origin_framework, :user_email, :created_at, :updated_at)
        `).run(data);

        return task;
    }

    async findAll(filters = {}) {
        let query = "SELECT * FROM tasks WHERE 1=1";
        const params = {};

        if (filters.status) {
            query += " AND status = :status";
            params.status = filters.status;
        }

        if (filters.priority) {
            query += " AND priority = :priority";
            params.priority = filters.priority;
        }

        query += " ORDER BY due_date ASC";

        const rows = db.prepare(query).all(params);
        return rows.map((row) => this.#rowToTask(row));
    }

    async findById(taskId) {
        const row = db.prepare("SELECT * FROM tasks WHERE task_id = :task_id").get({ task_id: taskId });
        if (!row) {
            return null;
        }
        return this.#rowToTask(row);
    }

    async update(task) {
        

        const data = task.toJSON();

        const params = {
            task_id: data.task_id,
            title: data.title,
            description: data.description,
            due_date: data.due_date,
            priority: data.priority,
            status: data.status,
            updated_at: data.updated_at,
        };

        db.prepare(`
            UPDATE tasks
            SET title = :title,
                description = :description,
                due_date = :due_date,
                priority = :priority,
                status = :status,
                updated_at = :updated_at
            WHERE task_id = :task_id
        `).run(params);

        return task;
    }

    async delete(taskId) {
        db.prepare("DELETE FROM tasks WHERE task_id = :task_id").run({ task_id: taskId });
    }

    async existsByTitle(title, excludeTaskId = null) {
        let query = "SELECT COUNT(*) as count FROM tasks WHERE title = :title";
        const params = { title };

        if (excludeTaskId) {
            query += " AND task_id != :exclude_id";
            params.exclude_id = excludeTaskId;
        }

        const result = db.prepare(query).get(params);
        return result.count > 0;
    }
}