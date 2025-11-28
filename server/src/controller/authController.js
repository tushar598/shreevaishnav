import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import student from "../models/student.js";
import faculty from "../models/faculty.js";
import admin from "../models/admin.js";

const maxAge = 3 * 24 * 60 * 60; // 3 days

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// ---------------------------- Register student ----------------------------

export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      rollno,
      class: cls,
      section,
      dob,
      email,
      password,
    } = req.body;

    const existing = await student.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const student = await student.create({
      name,
      rollno,
      class: cls,
      section,
      dob,
      email,
      passwordHash,
    });

    return res.json({ message: "student registered", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------- Register faculty ----------------------------

export const registerFaculty = async (req, res) => {
  try {
    const { name, branch, faculty_id, email, number, password } = req.body;

    const existing = await faculty.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const faculty = await faculty.create({
      name,
      branch,
      faculty_id,
      email,
      number,
      passwordHash,
    });

    return res.json({ message: "faculty registered", faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------- Register admin ----------------------------

export const registerAdmin = async (req, res) => {
  try {
    const { admin_name, mail, password } = req.body;

    const existing = await admin.findOne({ mail });
    if (existing)
      return res.status(400).json({ message: "admin already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await admin.create({
      admin_name,
      mail,
      passwordHash,
    });

    return res.json({ message: "admin registered", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------- Login ----------------------------

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "student") user = await student.findOne({ email });
    if (role === "faculty") user = await faculty.findOne({ email });
    if (role === "admin") user = await admin.findOne({ mail: email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Incorrect Password" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: maxAge * 1000,
    });

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        role: user.role,
        email: role === "admin" ? user.mail : user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ---------------------------- Logout ----------------------------

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
