import express from "express";
import {
  deleteProfile,
  getAllUser,
  getProfile,
  updateProfile,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), getAllUser);

router.delete("/", authenticate, authorize("admin"), deleteProfile);
// Get user profile
router.get("/me", authenticate, getProfile);

// Update user profile
router.put("/me", authenticate, updateProfile);

export default router;
