import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParsel from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParsel()); //  to estract the cookies from the browser

app.listen(3000, () => console.log("Listening on port 3000"));

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// creating error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
