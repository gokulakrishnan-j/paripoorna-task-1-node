import express from "express";
import {
  creatingUser,
  getUserDetails,
  deleteUser,
  editUserDetails,
} from "../controllers/user.controller.js";
import { validation } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/", [validation], creatingUser);

router.get("/", getUserDetails);

router.delete("/:id", deleteUser);

router.put("/:id", [validation], editUserDetails);

export default router;
