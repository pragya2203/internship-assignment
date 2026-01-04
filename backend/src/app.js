import express from "express";
import cors from "cors";
import organizationRoutes from "./routes/organizationRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",                 // local Vite
      "https://internship-assignment-2-8azl.onrender.com", // Render frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/employees", employeeRoutes);

export default app;
