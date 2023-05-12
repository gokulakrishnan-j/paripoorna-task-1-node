import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import serverConfig from "./configs/server.js";
import dbConfig from "./configs/db.js";
import { errorStatusCode } from "./constants/errors/errorStatusCode.js";
import { response } from "./constants/reusable/response.js";

// calling express
const app = express();

// using body parser
app.use(express.json());

// cors is allowing send a response
app.use(cors());

// server port
const PORT = serverConfig.PORT;

app.use(async (req, res, next) => {
  try {
    // connecting mongoose
    await mongoose.connect(dbConfig.MONGO_URL, { dbName: "task-1" });
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
  next();
});

app.use("/v1/user", userRouter);
// Starting server
app.listen(PORT, console.log(`Sever starts in PORT ${PORT}✨`));
