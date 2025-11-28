import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    branch: { type: String, required: true },
    faculty_id: { type: String, required: true, unique: true },
    number: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    role: { type: String, default: "faculty" },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
