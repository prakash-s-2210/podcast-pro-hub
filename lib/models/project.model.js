import mongoose from "mongoose";

export const chatbotConfigurationSchema = new mongoose.Schema(
  {
    chatbotName: String,
    welcomeMessage: String,
    inputPlaceholder: String,
    primaryColor: String,
    fontColor: String,
    fontSize: Number,
    chatHeight: Number,
    showSources: Boolean,
    chatIconSize: String,
    position: String,
    distanceFromBottom: Number,
    horizontalDistance: Number,
    botIcon: String,
  },
  {
    timestamps: true, // Add timestamps option
  }
);

export const fileSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Add timestamps option
  }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    widgetConfiguration: {
      type: [chatbotConfigurationSchema],
      default: [],
    },
    files: {
      type: [fileSchema],
      default: [],
    },
  },
  {
    timestamps: true, // Add timestamps option
  }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
