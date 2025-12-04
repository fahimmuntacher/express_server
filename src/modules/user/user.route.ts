import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// post request
router.post("/", userControllers.createUser)


// get request
router.get("/", auth(), userControllers.getUser)

// get single User
router.get("/:id", userControllers.getSingleUser)

// single user update
router.put("/:id", userControllers.updateUser)

// delete user 
router.delete("/:id", userControllers.deleteUser)

export const userRoutes = router;