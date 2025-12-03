import { Router } from "express";
import { todosControllers } from "./todos.controller";

const router = Router();

// create todo
router.post("/", todosControllers.createTodo)

// get todos
router.get("/", todosControllers.getTodos)

// get single todo
router.get("/:id", todosControllers.getSingleTodo)

// delete single todo
router.delete("/:id", todosControllers.delteSingleTodo)
export const todosRoute = router;