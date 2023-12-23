import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  credentials: {
    type: String,
    unique: true,
  },
  projects: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    }],
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;