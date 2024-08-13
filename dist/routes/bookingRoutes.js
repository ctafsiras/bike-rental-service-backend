"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const authenticate_1 = require("../middlewares/authenticate");
const authorize_1 = require("../middlewares/authorize");
const router = express_1.default.Router();
// Create rental
router.post("/", authenticate_1.authenticate, bookingController_1.createRental);
// Return bike (Admin only)
router.put("//:id/return", authenticate_1.authenticate, (0, authorize_1.authorize)("admin"), bookingController_1.returnBike);
// Get all rentals for user
router.get("/", authenticate_1.authenticate, bookingController_1.getUserRentals);
exports.default = router;
