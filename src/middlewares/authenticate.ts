import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dhoom ma chale";

// Middleware to authenticate the user
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).userId = decoded.userId; // Attach the userId to the request object
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }
};
