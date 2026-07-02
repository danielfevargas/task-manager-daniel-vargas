export class UpdateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(taskId, changes) {
        const task = await this.taskRepository.findById(taskId);
        if (task === null) {
            throw new Error("No se encontró la tarea");
        }

        if (changes.title && changes.title !== task.title) {
            const titleExists = await this.taskRepository.existsByTitle(changes.title, taskId);
            if (titleExists) {
                throw new Error(`Ya existe una tarea con el título: "${changes.title}"`);
            }
        }

        task.update(changes);

        await this.taskRepository.update(task);

        return task;
    }
}