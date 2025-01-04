import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// Import routes
import authRoutes from "./routes/authRoutes.route.js";
import messageRoutes from "./routes/messageRoutes.route.js";
import userRoutes from "./routes/userRoutes.route.js";

// configs
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({ limit: 100, windowMs: 10 * 60 * 1000 });
app.use(limiter);
app.set("eTag", process.env.NODE_ENV === "production");

// routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Page!");
});
export default app;
