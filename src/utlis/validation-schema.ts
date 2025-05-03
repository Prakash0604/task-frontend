import { z } from "zod";

// login -schema
const loginSchema = z.object({
        email: z.string().email('Invalid email address').min(1, 'Email is required'),
        password: z.string().min(6, 'Password must be at least 6 characters').min(1, 'Password is required'),
});


// create-user schema
const userSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        address: z.string().min(1, "Address is required"),
        contact: z.string().min(10, "Contact must be at least 10 digits"),
        password: z
                .string()
                .min(8, "Password must be at least 8 characters")
                .regex(/[A-Z]/, "Must contain an uppercase letter")
                .regex(/[a-z]/, "Must contain a lowercase letter")
                .regex(/[0-9]/, "Must contain a number")
                .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
        profile: z
                .instanceof(File)
                .optional()
                .or(z.null())
                .refine((file) => file instanceof File || file === null, {
                        message: "Invalid file",
                }),
});


export { loginSchema, userSchema }