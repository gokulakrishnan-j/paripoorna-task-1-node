import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import serverConfig from "./configs/server.config.js";
import dbConfig from "./configs/db.config.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = serverConfig.PORT;

async function db() {
  try {
    await mongoose.connect(dbConfig.MONGO_URL, { dbName: "task-1" });
  } catch (err) {
    console.log("mongoose connection err", err);
  }
}
db();

app.use("/v1/user", userRouter);

app.listen(PORT);
