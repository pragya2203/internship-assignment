import express from "express";
import cors from "cors";
import organizationRoutes from "./routes/organizationRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);         // ✅ ADD THIS
app.use("/api/organizations", organizationRoutes);
app.use("/api/employees", employeeRoutes);

export default app;
