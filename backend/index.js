import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description:
        "API for tracking income, expenses, categories, uploads, and admin analytics.",
    },
    servers: [
      {
        url:
          process.env.RENDER_URL ||
          `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

connectDB();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
  res.json({
    message: "Finance Tracker API Running",
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});