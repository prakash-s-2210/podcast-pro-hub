import * as z from "zod";

export const signupValidation = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  email: z.string().email(),
});

export const loginValidation = z.object({
  email: z.string().email(),
});

export const accountSettingValidation = z.object({
  username: z.string().min(3, { message: "Username is required, minimum 3 characters" }),
  email: z.string(),
});
