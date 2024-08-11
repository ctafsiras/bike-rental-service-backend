import express from "express";
import {
  signUp,
  login,
  getProfile,
  updateProfile,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

// User signup
router.post("/signup", signUp);

// User login
router.post("/login", login);

export default router;
