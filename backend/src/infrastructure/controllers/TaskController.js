// src/infrastructure/controllers/TaskController.js
export class TaskController {
    constructor(useCases) {
        this.createTaskUseCase = useCases.createTaskUseCase;
        this.getTasksUseCase = useCases.getTasksUseCase;
        this.getTaskByIdUseCase = useCases.getTaskByIdUseCase;
        this.updateTaskUseCase = useCases.updateTaskUseCase;
        this.deleteTaskUseCase = useCases.deleteTaskUseCase;
    }

    create = async (req, res) => {
        try {
            const task = await this.createTaskUseCase.execute(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAll = async (req, res) => {
        try {
            const filters = {
                status: req.query.status,
                priority: req.query.priority,
            };
            const tasks = await this.getTasksUseCase.execute(filters);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const task = await this.getTaskByIdUseCase.execute(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const task = await this.updateTaskUseCase.execute(req.params.id, req.body);
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            await this.deleteTaskUseCase.execute(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
}