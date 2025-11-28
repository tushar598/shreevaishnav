import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollno: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  role: { type: String, default: "student" },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
