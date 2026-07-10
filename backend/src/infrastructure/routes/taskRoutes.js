import { Router } from "express";

export function createTaskRoutes(taskController, pokemonController) {
    const router = Router();

    router.post("/tasks", taskController.create);
    router.get("/tasks", taskController.getAll);
    router.get("/tasks/:id", taskController.getById);
    router.put("/tasks/:id", taskController.update);
    router.delete("/tasks/:id", taskController.delete);
    router.get("/pokemon/:name", pokemonController.getPokemon);

    return router;
}
