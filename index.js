import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.router.js";
import serverConfig from "./config/server.config.js";
import dbConfig from "./config/db.config.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = serverConfig.PORT;

async function db() {
  try {
    await mongoose.connect(
      "mongodb+srv://gokulakrishnan252:Gokul4580@cluster0.pfqdvxg.mongodb.net",
      { dbName: "task-1" }
    );
  } catch (err) {
    console.log("mongoose connection err", err);
  }
}
db();

app.use("/user", userRouter);

app.listen(PORT);
