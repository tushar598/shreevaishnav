import express from "express";
import {
  registerStudent,
  registerFaculty,
  registerAdmin,
  login,
  logout,
} from "../controller/authController.js";

const router = express.Router();

// Student
router.post("/register/student", registerStudent);

// Faculty
router.post("/register/faculty", registerFaculty);

// Admin
router.post("/register/admin", registerAdmin);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

export default router;
