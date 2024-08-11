import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
