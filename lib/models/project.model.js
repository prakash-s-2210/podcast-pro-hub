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

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    widgetConfiguration: chatbotConfigurationSchema,
    files: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      }],
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
