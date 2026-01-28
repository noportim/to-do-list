import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    title: { type: String, require: true },
    text: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Task", TaskSchema);
