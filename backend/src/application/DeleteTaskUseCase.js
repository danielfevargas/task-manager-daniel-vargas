export class DeleteTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if (task === null) {
            throw new Error("No se encontró la tarea");
        }

        await this.taskRepository.delete(taskId);
    }
}