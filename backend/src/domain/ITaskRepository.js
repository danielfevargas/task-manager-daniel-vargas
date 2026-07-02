export class ITaskRepository {
    async create(task) {
        throw new Error("Método 'create' no implementado.");
    }

    async findAll(filters) {
        throw new Error("Método 'findAll' no implementado.");
    }

    async findById(taskId) {
        throw new Error("Método 'findById' no implementado.");
    }

    async update(task) {
        throw new Error("Método 'update' no implementado.");
    }

    async delete(taskId) {
        throw new Error("Método 'delete' no implementado.");
    }

    async existsByTitle(title, excludeTaskId = null) {
        throw new Error("Método 'existsByTitle' no implementado.");
    }
}