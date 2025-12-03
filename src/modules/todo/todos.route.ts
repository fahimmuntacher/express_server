import { Router } from "express";
import { todosControllers } from "./todos.controller";

const router = Router();

// create todo
router.post("/", todosControllers.createTodo)

// get todos
router.get("/", todosControllers.getTodos)
export const todosRoute = router;