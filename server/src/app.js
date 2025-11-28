import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

/* -------------------- MIDDLEWARES -------------------- */

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true,
  })
);

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);


export default app;
