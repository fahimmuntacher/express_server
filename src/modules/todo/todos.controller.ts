import { Request, Response } from "express";
import { todosService } from "./todos.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todosService.createTodo(user_id, title)
    res.status(201).json({
      success: true,
      message: "todo created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// get todos
const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosService.getTodo();
    res.status(200).json({
      success: true,
      message: "todos retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
}


export const todosControllers = {
    createTodo,
    getTodos
}