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
        contact: z.string().regex(/^\d{10}$/, "Contact must be 10 digits"),
        password: z
                .string()
                .min(8, "Password must be at least 8 characters")
                .regex(/[A-Z]/, "Include at least one uppercase letter")
                .regex(/[a-z]/, "Include at least one lowercase letter")
                .regex(/[0-9]/, "Include at least one number")
                .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
        profile: z
                .union([
                        z.instanceof(File).refine((file) => file.size > 0, {
                                message: "Uploaded file is empty",
                        }),
                        z.literal(null),
                        z.undefined(),
                ])
                .optional(),
});


export { loginSchema, userSchema }