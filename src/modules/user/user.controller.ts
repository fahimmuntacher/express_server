import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result =await userServices.createUser(name, email);
    console.log(result);
    res.send({ message: "data inserted", data: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  res.status(201).json({
    success: true,
    message: "API is walking",
  });
}

export const userControllers = {
    createUser,
}