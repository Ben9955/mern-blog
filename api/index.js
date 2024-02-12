import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParsel from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

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
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

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
