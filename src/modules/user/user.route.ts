import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

// post request
router.post("/", userControllers.createUser)


// get request
router.get("/", userControllers.getUser)

// get single User
router.get("/:id", userControllers.getSingleUser)

// single user update
router.put("/:id", userControllers.updateUser)

export const userRoutes = router;