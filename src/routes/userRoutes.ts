import express from "express";
import {
  signUp,
  login,
  getProfile,
  updateProfile,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

// Get user profile
router.get("/me", authenticate, getProfile);

// Update user profile
router.put("/me", authenticate, updateProfile);

export default router;
