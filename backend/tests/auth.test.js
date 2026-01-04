import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/models/User.js";

jest.setTimeout(20000);

/* =====================
   SETUP / TEARDOWN
===================== */

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  // Clean users before every test (SAFE: test DB)
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

/* =====================
   AUTH UNIT TESTS
===================== */

describe("Auth API Tests", () => {
  test("❌ Signup fails with invalid email", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        email: "invalidemail",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid email/i);
  });

  test("❌ Duplicate email is not allowed", async () => {
    // First signup
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    // Duplicate signup
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already/i);
  });

  test("❌ Login fails with wrong password", async () => {
    // Create user
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
  });
});
