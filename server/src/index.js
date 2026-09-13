import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";

import connectDB from "./config/db.js";

import ticketRoutes from "./modules/tickets/ticket.route.js";
import {
  notFound,
  errorHandler
} from "./middlewares/errorMiddleware.js";


dotenv.config();

await connectDB();
const app = express();

const _dirname = path.resolve();

app.use(helmet());
const allowedOrigins = [process.env.CLIENT_URL];

app.use(
  cors({
    origin: process.env.CLIENT_URL
  })
);

app.use(
  express.json({
    limit: "1mb"
  })
);

if (
  process.env.NODE_ENV ===
  "development"
) {
  app.use(morgan("dev"));
}
const apiLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message:
        "Too many requests. Please try again later."
    }
  });

app.use(
  "/api",
  apiLimiter
);
app.use(
  "/api/tickets",
  ticketRoutes
);

app.use(express.static(path.join(_dirname, "client", "dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
})


app.use(notFound);
app.use(errorHandler);

const PORT =
  process.env.PORT

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);