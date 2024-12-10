import mongoose from "mongoose"

const Task = mongoose.Schema({

  title: { required: true, type: String, length: 100 },
  description: { type: String },
  status: { type: String, default: "TODO", Enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'] },
  priority: { type: String, Enum: ['LOW', 'MEDIUM', 'HIGH'] },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, timestamps: true })
export default mongoose.model("TaskSchema", Task, "Task")