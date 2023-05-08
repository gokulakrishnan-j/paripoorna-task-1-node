import express from "express";
import {
  creatingUser,
  getUserDetails,
  deleteUser,
  editUserDetails,
} from "../controller/user.service.js";

const router = express.Router();

router.post("/v1/userData", creatingUser());

router.get("/v1/userData", getUserDetails());

router.delete("/v1/deleteUser/:id", deleteUser());

router.put("/v1/editData/:id", editUserDetails());

export default router;
