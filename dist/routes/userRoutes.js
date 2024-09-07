"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authenticate_1 = require("../middlewares/authenticate");
const authorize_1 = require("../middlewares/authorize");
const router = express_1.default.Router();
router.get("/", authenticate_1.authenticate, (0, authorize_1.authorize)("admin"), userController_1.getAllUser);
// Get user profile
router.get("/me", authenticate_1.authenticate, userController_1.getProfile);
// Update user profile
router.put("/me", authenticate_1.authenticate, userController_1.updateProfile);
exports.default = router;
