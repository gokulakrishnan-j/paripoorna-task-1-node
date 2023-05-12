import mongoose from "mongoose";

// Schema
const employeeSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);
const Model = mongoose.model("userdetails", employeeSchema);

export default Model;
