import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import taskRoute from "./routes/tasks.js";

const app = express();
dotenv.config();

// Constants
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.3ug7rsp.mongodb.net/`,
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
