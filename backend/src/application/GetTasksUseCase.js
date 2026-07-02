export class GetTasksUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(filters) {
        const tasks = await this.taskRepository.findAll(filters);
        return tasks;
    }
}