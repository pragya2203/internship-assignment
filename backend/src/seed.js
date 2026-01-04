import mongoose from "mongoose";
import dotenv from "dotenv";
import Organization from "./models/Organization.js";
import Employee from "./models/Employee.js";

dotenv.config();

async function seedDatabase() {
  try {
    // 🔹 Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 🔹 Remove previous data
    await Employee.deleteMany({});
    await Organization.deleteMany({});
    console.log("🧹 Old data removed");

    // 🔹 Create organizations
    const organizations = await Organization.insertMany([
      {
        name: "Maintonia",
        industry: "AI",
        description: "AI Solutions Company",
      },
      {
        name: "TechNova",
        industry: "Software",
        description: "Web & Cloud Services",
      },
      {
        name: "FinEdge",
        industry: "Finance",
        description: "Fintech Platform",
      },
    ]);

    console.log("🏢 Organizations created");

    // 🔹 Create employees
    await Employee.insertMany([
      {
        fullName: "Aarav Sharma",
        email: "aarav@maintonia.com",
        phone: "9876543210",
        position: "Frontend Developer",
        department: "Engineering",
        organization: organizations[0]._id,
        joiningDate: new Date("2023-01-10"),
        salary: 60000,
        status: "Active",
      },
      {
        fullName: "Priya Verma",
        email: "priya@maintonia.com",
        phone: "9876543211",
        position: "Backend Developer",
        department: "Engineering",
        organization: organizations[0]._id,
        joiningDate: new Date("2023-03-15"),
        salary: 65000,
        status: "Active",
      },
      {
        fullName: "Rohit Mehta",
        email: "rohit@technova.com",
        phone: "9876543212",
        position: "DevOps Engineer",
        department: "Infrastructure",
        organization: organizations[1]._id,
        joiningDate: new Date("2022-11-05"),
        salary: 70000,
        status: "Active",
      },
      {
        fullName: "Sneha Kapoor",
        email: "sneha@technova.com",
        phone: "9876543213",
        position: "HR Manager",
        department: "HR",
        organization: organizations[1]._id,
        joiningDate: new Date("2021-08-20"),
        salary: 55000,
        status: "Inactive",
      },
      {
        fullName: "Amit Singh",
        email: "amit@finedge.com",
        phone: "9876543214",
        position: "Data Analyst",
        department: "Analytics",
        organization: organizations[2]._id,
        joiningDate: new Date("2022-02-14"),
        salary: 62000,
        status: "Active",
      },
      {
        fullName: "Neha Jain",
        email: "neha@finedge.com",
        phone: "9876543215",
        position: "Product Manager",
        department: "Product",
        organization: organizations[2]._id,
        joiningDate: new Date("2021-06-30"),
        salary: 80000,
        status: "Active",
      },
      {
        fullName: "Karan Malhotra",
        email: "karan@maintonia.com",
        phone: "9876543216",
        position: "UI Designer",
        department: "Design",
        organization: organizations[0]._id,
        joiningDate: new Date("2023-07-01"),
        salary: 50000,
        status: "Active",
      },
      {
        fullName: "Pooja Nair",
        email: "pooja@technova.com",
        phone: "9876543217",
        position: "QA Engineer",
        department: "Testing",
        organization: organizations[1]._id,
        joiningDate: new Date("2022-04-12"),
        salary: 48000,
        status: "Inactive",
      },
      {
        fullName: "Vikas Gupta",
        email: "vikas@finedge.com",
        phone: "9876543218",
        position: "Security Analyst",
        department: "Security",
        organization: organizations[2]._id,
        joiningDate: new Date("2023-09-18"),
        salary: 72000,
        status: "Active",
      },
      {
        fullName: "Anjali Patel",
        email: "anjali@maintonia.com",
        phone: "9876543219",
        position: "Marketing Executive",
        department: "Marketing",
        organization: organizations[0]._id,
        joiningDate: new Date("2022-12-01"),
        salary: 45000,
        status: "Active",
      },
    ]);

    console.log("👨‍💼 Employees created");
    console.log("🎉 Database seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
