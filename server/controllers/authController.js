// backend/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let userRole = null;
  let expectedPassword = null;

  // Match email with .env users
  if (email === process.env.ADMIN_EMAIL) {
    userRole = "admin";
    expectedPassword = process.env.ADMIN_PASSWORD;
  } else if (email === process.env.DEMO_EMAIL) {
    userRole = "demoUser";
    expectedPassword = process.env.DEMO_PASSWORD;
  } else {
    return res.status(401).json({ message: "User not found" });
  }

  // Check password
  const isMatch = password === expectedPassword; // for demo only; bcrypt not needed here
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  console.log("Login attempt", { email, password, expectedPassword });


  // Sign JWT
  const token = jwt.sign({ email, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    message: "Login successful",
    token,
    role: userRole,
  });
};
