// src/main.js
import express from "express";
import cors from "cors";

import { SQLiteTaskRepository } from "./infrastructure/repositories/SQLiteTaskRepository.js";
import { CreateTaskUseCase } from "./application/CreateTaskUseCase.js";
import { GetTasksUseCase } from "./application/GetTasksUseCase.js";
import { GetTaskByIdUseCase } from "./application/GetTaskByIdUseCase.js";
import { UpdateTaskUseCase } from "./application/UpdateTaskUseCase.js";
import { DeleteTaskUseCase } from "./application/DeleteTaskUseCase.js";
import { TaskController } from "./infrastructure/controllers/TaskController.js";
import { createTaskRoutes } from "./infrastructure/routes/taskRoutes.js";

// 1. Elegimos la implementación concreta del repositorio (único lugar del proyecto donde se decide esto)
const taskRepository = new SQLiteTaskRepository();

// 2. Inyectamos ese repositorio en cada caso de uso
const useCases = {
    createTaskUseCase: new CreateTaskUseCase(taskRepository),
    getTasksUseCase: new GetTasksUseCase(taskRepository),
    getTaskByIdUseCase: new GetTaskByIdUseCase(taskRepository),
    updateTaskUseCase: new UpdateTaskUseCase(taskRepository),
    deleteTaskUseCase: new DeleteTaskUseCase(taskRepository),
};

// 3. Creamos el controller con esos use cases
const taskController = new TaskController(useCases);

// 4. Armamos el servidor Express
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", createTaskRoutes(taskController));

app.get("/", (req, res) => {
    res.json({ message: "Supervisa Task Manager API 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});