import express from "express";
import {
  creatingUser,
  getUserDetails,
  deleteUser,
  editUserDetails,
} from "../controllers/user.controller.js";
import {
  validation,
  deleteValidationMiddleware,
  emailUniqueValidation,
} from "../middlewares/user.middleware.js";

const router = express.Router();

// Route to post a data
router.post("/", [validation, emailUniqueValidation], creatingUser);

// Route to get data
router.get("/", getUserDetails);

// Route to delete particular data with id
router.delete("/:id", [deleteValidationMiddleware], deleteUser);

// Route to edit particular data
router.put("/:id", [validation], editUserDetails);

export default router;
