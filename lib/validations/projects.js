import * as z from "zod";

export const projectValidation = z.object({
  title: z.string().min(5, { message: "Project Name Can't be empty" }),
});