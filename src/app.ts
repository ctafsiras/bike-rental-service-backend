import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import bikeRoutes from "./routes/bikeRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);

export default app;
