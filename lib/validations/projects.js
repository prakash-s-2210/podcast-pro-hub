import * as z from "zod";

export const projectValidation = z.object({
  title: z
    .string({
      required_error: "Title name is required",
      invalid_type_error: "Title name must be a string",
    })
    .min(5, {
      message: "Project Name Can't be empty. Minimum 5 characters are required",
    }),
});

export const uploadValidation = z.object({
  title: z
    .string({
      required_error: "Title name is required",
      invalid_type_error: "Title name must be a string",
    })
    .min(5, {
      message: "File Name Can't be empty. Minimum 5 characters are required",
    }),
  description: z
    .string()
    .min(50, { message: "Minimum 50 characters are required" }),
});

export const widgetConfigurationValidation = z.object({
  chatbotName: z.string().min(1, { message: "Chatbot name is required" }),
  welcomeMessage: z.string().min(1, { message: "Welcome message is required" }),
  inputPlaceholder: z.string().min(1, { message: "Input placeholder is required" }),
  primaryColor: z.string().min(1, { message: "Primary color is required" }),
  fontColor: z.string().min(1, { message: "Font color is required" }),
  fontSize: z.coerce.number({
    required_error: "Font size is required",
  }).min(1,  { message: "Font size is required" }),
  chatHeight: z.coerce.number({
    required_error: "Chat height is required",
  }).min(1,  { message: "Chat height is required" }),
  showSources: z.boolean(),
  chatIconSize: z.string().min(1, { message: "Chat icon size is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  distanceFromBottom: z.coerce.number({
    required_error: "Distance from bottom is required",
  }).min(1,  { message: "Distance from bottom is required" }),
  horizontalDistance: z.coerce.number({
    required_error: "Horizontal distance is required",
  }).min(1,  { message: "Horizontal distance is required" }),
  botIcon: z.string().min(1, { message: "Bot icon is required" }),
});
