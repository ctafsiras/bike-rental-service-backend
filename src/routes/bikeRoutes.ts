import express from "express";
import {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
} from "../controllers/bikeController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

// Create bike (Admin only)
router.post("/", authenticate, authorize("admin"), createBike);

// Get all bikes
router.get("/", getAllBikes);

// Update bike (Admin only)
router.put("/:id", authenticate, authorize("admin"), updateBike);

// Delete bike (Admin only)
router.delete("/:id", authenticate, authorize("admin"), deleteBike);

export default router;
