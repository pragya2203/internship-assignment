import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import Employee from "../src/models/Employee.js";
import Organization from "../src/models/Organization.js";
import User from "../src/models/User.js";

jest.setTimeout(20000);

let token;
let organizationId;

/* =====================
   SETUP / TEARDOWN
===================== */

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  // Clean test DB (SAFE)
  await User.deleteMany({});
  await Employee.deleteMany({});
  await Organization.deleteMany({});

  // Create test user
  await User.create({
    email: "employee@test.com",
    password: "password123",
  });

  // Login & get token
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "employee@test.com",
      password: "password123",
    });

  token = loginRes.body.token;

  // Create test organization
  const org = await Organization.create({
    name: "Test Organization",
  });

  organizationId = org._id;
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

/* =====================
   EMPLOYEE UNIT TESTS
===================== */

describe("Employee API Tests", () => {
  test("✅ Employee is created successfully", async () => {
    const res = await request(app)
      .post("/api/employees")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "9876543210",
        position: "Software Engineer",
        department: "Engineering",
        organization: organizationId,
        joiningDate: "2024-01-01",
        salary: 50000,
        status: "Active",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.fullName).toBe("John Doe");
    expect(res.body.email).toBe("john.doe@example.com");
  });

  test("❌ Employee creation fails if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/employees")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "missing@example.com",
      });

    expect(res.statusCode).toBe(400);
  });
});
