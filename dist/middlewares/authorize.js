"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const User_1 = require("../models/User");
// Middleware to authorize based on role
const authorize = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.userId;
        // Find the user by ID
        const user = yield User_1.User.findById(userId);
        if (!user || user.role !== role) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: "Forbidden: Insufficient permissions",
            });
        }
        next();
    });
};
exports.authorize = authorize;
