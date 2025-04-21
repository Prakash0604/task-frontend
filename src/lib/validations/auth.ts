import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
})
export type LoginFormValues = z.infer<typeof loginSchema>

export const addTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").nonempty("Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .nonempty("Description is required"),
  assignedUsers: z
    .array(z.string())
    .min(1, "At least one user must be assigned"),
  comment: z.string().max(200, "Comment cannot exceed 200 characters").optional(),
});

export type FormData = z.infer<typeof addTaskSchema>;
