export class GetTaskByIdUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if(task === null) {
            throw new Error("No se Encontro La Tarea")
        }

        return task
    }
}