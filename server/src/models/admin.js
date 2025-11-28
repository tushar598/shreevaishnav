import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    admin_name: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
