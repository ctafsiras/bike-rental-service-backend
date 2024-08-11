import mongoose from "mongoose";
import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DATABASE_URL;

mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
