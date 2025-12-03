
import express, { NextFunction, Request, Response } from "express";
import { Pool, Result } from "pg";
import config from "./config";
import initDb, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.route";

const app = express();
const port = config.port

// initializing db
initDb();



app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello first server!");
});

// users CRUD
app.use("/users", userRoutes)

// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
//       [name, email]
//     );
//     console.log(result);
//     res.send({ message: "data inserted", data: result.rows[0] });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }

//   res.status(201).json({
//     success: true,
//     message: "API is walking",
//   });
// });

// USERS GET API
// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);
//     res.status(200).json({
//       success: true,
//       message: "users retrived successfully",
//       data: result.rows,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       details: err,
//     });
//   }
// });

// users get by id
// app.get("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users WHERE id  = $1`, [
//       req.params.id,
//     ]);
//     if (result.rows.length === 0) {
//       res.status(401).json({
//         success: false,
//         message: "user not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "User fetched successfully",
//         data: result.rows[0],
//       });
//     }
//     console.log(result.rows);
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// users update api
// app.put("/users/:id", async (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   console.log(name, email);
//   try {
//     const result = await pool.query(
//       `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
//       [name, email, req.params.id]
//     );
//     if (result.rows.length === 0) {
//       res.status(401).json({
//         success: false,
//         message: "user not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "User updated successfully",
//         data: result.rows[0],
//       });
//     }
//     console.log(result.rows);
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// user delete
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });

    console.log(result.rows);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// todos crud

// todos post
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO  todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );
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
});

// todos get
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
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
});

// Get single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});
app.listen(port, () => {
  console.log(`Fahim listening on port ${port}`);
});
