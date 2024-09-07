import express from "express";
import { getAllUser, getProfile, updateProfile } from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = express.Router();


router.get("/me", authenticate,authorize("admin"), getAllUser);
// Get user profile
router.get("/me", authenticate, getProfile);

// Update user profile
router.put("/me", authenticate, updateProfile);

export default router;
