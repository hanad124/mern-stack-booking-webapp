import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
