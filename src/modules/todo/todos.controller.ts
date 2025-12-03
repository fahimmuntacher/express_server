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

// get single todos 
const getSingleTodo = async (req : Request, res : Response) => {
  try {
    const result = await todosService.getSingleTodo(req.params.id!)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
}

// delete todo

const delteSingleTodo = async (req : Request, res : Response) => {
  try {
    const result = await todosService.deleteTodo(req.params.id!)

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
}


export const todosControllers = {
    createTodo,
    getTodos,
    getSingleTodo,
    delteSingleTodo
}