// backend/routes/data.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Read Route – everyone can access
router.get("/read", verifyToken, (req, res) => {
  res.json({ message: "Read: Access granted to " + req.user.role });
});

// Write Route – only admin
router.post("/write", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Write: Access denied (admin only)" });
  }

  res.json({ message: "Write: Action successful for admin" });
});

export default router;
