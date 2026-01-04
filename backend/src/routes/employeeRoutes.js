import express from "express";
import Employee from "../models/Employee.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* =====================
   HELPERS
===================== */
const REQUIRED_FIELDS = [
    "fullName",
    "email",
    "phone",
    "position",
    "department",
    "organization",
    "joiningDate",
    "status",
  ];
  
  const sanitize = (value) =>
    typeof value === "string" ? value.trim() : value;
  
  const validateEmployee = (data) => {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(data.fullName))
      return "Name can contain only letters and spaces";

    if (!emailRegex.test(data.email))
      return "Invalid email format";

    if (!phoneRegex.test(data.phone))
      return "Invalid phone number";

    // Salary is optional, but if provided must be positive
    if (data.salary && Number(data.salary) <= 0)
      return "Salary must be a positive number";

    return null;
  };
  
  const isFutureDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
  
    return inputDate > today;
  };
  

/* =====================
   ADD EMPLOYEE
===================== */
router.post("/", protect, async (req, res) => {
    try {
      // Sanitize input
      Object.keys(req.body).forEach(
        (key) => (req.body[key] = sanitize(req.body[key]))
      );

      // Convert empty salary to undefined (optional field)
      if (req.body.salary === "" || req.body.salary === null) {
        delete req.body.salary;
      } else if (req.body.salary !== undefined) {
        req.body.salary = Number(req.body.salary);
      }
  
      const missing = REQUIRED_FIELDS.filter(
        (f) => !req.body[f]
      );
      if (missing.length) {
        return res
          .status(400)
          .json({ message: `Missing fields: ${missing.join(", ")}` });
      }
  
      const validationError = validateEmployee(req.body);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }

        // ❌ Block future joining dates
        if (isFutureDate(req.body.joiningDate)) {
            return res.status(400).json({
                message: "Joining date cannot be in the future",
            });
        }

  
      const employee = await Employee.create(req.body);
      res.status(201).json(employee);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ message: "Email already exists" });
      }
  
      if (err.name === "ValidationError") {
        return res.status(400).json({
          message: Object.values(err.errors)
            .map((e) => e.message)
            .join(", "),
        });
      }
  
      res.status(500).json({ message: "Server error" });
    }
  });

/* =====================
   GET ALL EMPLOYEES
===================== */
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({ isDeleted: false })
      .populate("organization", "name")
      .sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================
   SEARCH EMPLOYEES
===================== */
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const employees = await Employee.find({
      isDeleted: false,
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { position: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } },
      ],
    }).populate("organization", "name");

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================
   FILTER EMPLOYEES
===================== */
router.get("/filter", async (req, res) => {
    try {
      const { org, dept, status } = req.query;
  
      const filter = { isDeleted: false };
  
      if (org) {
        filter.organization = org;
      }
  
      if (dept) {
        filter.department = { $regex: dept, $options: "i" }; 
      }
  
      if (status) {
        filter.status = status;
      }
  
      const employees = await Employee.find(filter)
        .populate("organization", "name")
        .sort({ createdAt: -1 });
  
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

/* =====================
   GET DELETED EMPLOYEES
===================== */
router.get("/deleted", async (req, res) => {
  try {
    const employees = await Employee.find({ isDeleted: true })
      .populate("organization", "name");

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================
   GET EMPLOYEE BY ID
===================== */
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("organization", "name");

    if (!employee || employee.isDeleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================
   UPDATE EMPLOYEE
===================== */
router.put("/:id", protect, async (req, res) => {
    try {
      Object.keys(req.body).forEach(
        (key) => (req.body[key] = sanitize(req.body[key]))
      );

      // Convert empty salary to undefined (optional field)
      if (req.body.salary === "" || req.body.salary === null) {
        delete req.body.salary;
      } else if (req.body.salary !== undefined) {
        req.body.salary = Number(req.body.salary);
      }
  
      const validationError = validateEmployee(req.body);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }
      
      if (req.body.joiningDate && isFutureDate(req.body.joiningDate)) {
        return res.status(400).json({
          message: "Joining date cannot be in the future",
        });
      }
      const employee = await Employee.findById(req.params.id);
      if (!employee || employee.isDeleted) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      Object.assign(employee, req.body);
      await employee.save();
  
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
  

/* =====================
   SOFT DELETE EMPLOYEE
===================== */
router.delete("/:id", protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee || employee.isDeleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.isDeleted = true;
    await employee.save();

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
