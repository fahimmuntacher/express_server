import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";


// create user
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

// get user

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getuser();
    res.status(200).json({
      success: true,
      message: "users retrived successfully",
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

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id as string)
    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
    console.log(result.rows);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// update single user
const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  console.log(name, email);
  try {
    const result = await userServices.updateUser(name, email, req.params.id!)
    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
    console.log(result.rows);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser
}