import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: boolean;
  message: string;
  errorMessages: { path: string; message: string }[];
  stack?: string;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  const errorResponse: ErrorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    errorMessages: [],
  };

  if (err.name === 'ValidationError') {
    errorResponse.message = 'Validation Error';
    errorResponse.errorMessages = Object.values(err.errors).map((e: any) => ({
      path: e.path,
      message: e.message,
    }));
  } else if (err.code === 11000) {
    errorResponse.message = 'Duplicate Entry';
    errorResponse.errorMessages = [
      {
        path: Object.keys(err.keyValue)[0],
        message: `Duplicate entry for ${Object.keys(err.keyValue)[0]}: ${Object.values(err.keyValue)[0]}`,
      },
    ];
  }

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(err.statusCode || 500).json(errorResponse);
};
