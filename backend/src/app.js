import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

// import router
import insightRoutes from "./routes/insight.routes.js";

// router declaration
app.use("/api/v1/insight", insightRoutes);

export { app };
