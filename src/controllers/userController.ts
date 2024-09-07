import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserType } from "../models/User";
import { z } from "zod";
import { userZodSchema } from "../zodSchemas/userZodSchema";

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "dhoom ma chale";

// Sign Up Controller
export const signUp = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = userZodSchema.parse(req.body);

    // Check if the email already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const newUser = new User({ ...validatedData, password: hashedPassword });

    // Save the user
    await newUser.save();
    newUser.password = "";

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid email or password",
      });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
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
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

// Get Profile Controller
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    user.password = "";
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Users not found",
      });
    }
    const allUsers = users.map((user) => {
      user.password = "";
      return user;
    });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users profile retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

// Update Profile Controller
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Assumes userId is added to request by authentication middleware

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    updatedUser.password = "";
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body; // Assumes userId is added to request by authentication middleware

    // Update the user's profile
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Profile deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

export const makeAdmin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body; // Assumes userId is added to request by authentication middleware

    // Update the user's profile
    const user = await User.findByIdAndUpdate(userId, { role: "admin" });

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
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};
