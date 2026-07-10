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
import { GetPokemon } from "./application/GetPokemon.js";
import { PokemonApi } from "./infrastructure/api/PokemonApi.js";
import { PokemonController } from "./infrastructure/controllers/PokemonController.js";

const taskRepository = new SQLiteTaskRepository();
const pokemonApi = new PokemonApi();

const useCases = {
    createTaskUseCase: new CreateTaskUseCase(taskRepository),
    getTasksUseCase: new GetTasksUseCase(taskRepository),
    getTaskByIdUseCase: new GetTaskByIdUseCase(taskRepository),
    updateTaskUseCase: new UpdateTaskUseCase(taskRepository),
    deleteTaskUseCase: new DeleteTaskUseCase(taskRepository),
    getPokemon: new GetPokemon(pokemonApi)
};

const taskController = new TaskController(useCases);
const pokemonController = new PokemonController(useCases.getPokemon);


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", createTaskRoutes(taskController, pokemonController));

app.get("/", (req, res) => {
    res.json({ message: "Supervisa Task Manager API 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});