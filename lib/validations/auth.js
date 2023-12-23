import * as z from "zod";

export const signupValidation = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email(),
});

export const loginValidation = z.object({
  email: z.string().email(),
});