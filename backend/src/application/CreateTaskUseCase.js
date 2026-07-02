import { randomUUID } from "crypto";
import { Task } from "../domain/task.js";

export class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(data) {
        const titleExists = await this.taskRepository.existsByTitle(data.title);
        if (titleExists) {
            throw new Error(`Ya existe una tarea con el título: "${data.title}"`);
        }

        const now = new Date().toISOString();
        const taskData = {
            ...data,
            taskId: randomUUID(),
            originFramework: "node-express",
            createdAt: now,
            updatedAt: now,
        };

        const task = new Task(taskData);

        await this.taskRepository.create(task);

        return task;
    }
}