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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const zod_1 = require("zod");
const userZodSchema_1 = require("../zodSchemas/userZodSchema");
// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;
// Sign Up Controller
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body
        const validatedData = userZodSchema_1.userZodSchema.parse(req.body);
        // Check if the email already exists
        const existingUser = yield User_1.User.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Email already exists",
            });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(validatedData.password, 10);
        const newUser = new User_1.User(Object.assign(Object.assign({}, validatedData), { password: hashedPassword }));
        // Save the user
        yield newUser.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: newUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
exports.signUp = signUp;
// Login Controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid email or password",
            });
        }
        // Check password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid email or password",
            });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});
exports.login = login;
// Get Profile Controller
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield User_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});
exports.getProfile = getProfile;
// Update Profile Controller
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Assumes userId is added to request by authentication middleware
        // Update the user's profile
        const updatedUser = yield User_1.User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});
exports.updateProfile = updateProfile;
