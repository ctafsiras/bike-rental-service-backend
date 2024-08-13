import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import bikeRoutes from "./routes/bikeRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/rentals", bookingRoutes);

app.all("*", (req, res) => {
  res.json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

app.use(errorHandler);

export default app;
