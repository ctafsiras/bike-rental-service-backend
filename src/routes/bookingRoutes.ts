import express from "express";
import {
  createRental,
  returnBike,
  getUserRentals,
  getAllUserRentals,
} from "../controllers/bookingController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

// Create rental
router.post("/", authenticate, createRental);

// Return bike (Admin only)
router.put("/:id/return", authenticate, authorize("admin"), returnBike);

// Get all rentals for user
router.get("/", authenticate, getUserRentals);
router.get("/all", authenticate, authorize("admin"), getAllUserRentals);

export default router;
