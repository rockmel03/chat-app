import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import corsOptions from "./config/corsOptions.js";
import errorHandler from "./utils/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// middlewares
app.use(cookieParser());
app.use(cors(corsOptions));

// basic middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

// routes import
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import userRoutes from "./routes/user.routes.js";

// routes
app.use("/api/v1/healthcheck", healthcheckRoutes);
app.use("/api/v1/user", userRoutes);

// default error handler
app.use(errorHandler);

export default app;
