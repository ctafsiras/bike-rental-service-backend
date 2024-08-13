"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bikeController_1 = require("../controllers/bikeController");
const authenticate_1 = require("../middlewares/authenticate");
const authorize_1 = require("../middlewares/authorize");
const router = express_1.default.Router();
// Create bike (Admin only)
router.post("/", authenticate_1.authenticate, (0, authorize_1.authorize)("admin"), bikeController_1.createBike);
// Get all bikes
router.get("/", bikeController_1.getAllBikes);
// Update bike (Admin only)
router.put("/:id", authenticate_1.authenticate, (0, authorize_1.authorize)("admin"), bikeController_1.updateBike);
// Delete bike (Admin only)
router.delete("/:id", authenticate_1.authenticate, (0, authorize_1.authorize)("admin"), bikeController_1.deleteBike);
exports.default = router;
