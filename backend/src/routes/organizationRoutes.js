import express from "express";
import Organization from "../models/Organization.js";
import Employee from "../models/Employee.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ======================
   CREATE ORGANIZATION
====================== */
router.post("/", protect, async (req, res) => {
  try {
    const { name, industry, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Organization name is required",
      });
    }

    const org = await Organization.create({
      name,
      industry,
      description,
    });

    res.status(201).json(org);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ======================
   GET ALL ORGANIZATIONS
====================== */
router.get("/", async (req, res) => {
  try {
    const orgs = await Organization.find().sort({ createdAt: -1 });
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ======================
   UPDATE ORGANIZATION
====================== */
router.put("/:id", protect, async (req, res) => {
    try {
      const { name, industry, description } = req.body;
  
      if (!name) {
        return res.status(400).json({
          message: "Organization name is required",
        });
      }
  
      const org = await Organization.findById(req.params.id);
  
      if (!org) {
        return res.status(404).json({
          message: "Organization not found",
        });
      }
  
      org.name = name;
      org.industry = industry;
      org.description = description;
  
      await org.save();
  
      res.json(org);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

/* ======================
   DELETE ORGANIZATION
====================== */
router.delete("/:id", protect, async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const employeesCount = await Employee.countDocuments({
      organization: org._id,
      isDeleted: false,
    });

    if (employeesCount > 0) {
      return res.status(400).json({
        message: "Cannot delete organization with active employees",
      });
    }

    await org.deleteOne();
    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
