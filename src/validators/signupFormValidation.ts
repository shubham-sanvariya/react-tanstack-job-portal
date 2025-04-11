import { z } from "zod";

export const signupFormValidation = z.object({
    username: z.string().min(3, "Name must contain 3 to 100 characters")
        .max(100, "Name must not exceed 100 characters"),
    email : z.string().email("Please enter a valid email"),
    password : z.string().min(8, "Password must contain 8 to 15 characters")
        .max(15, "Password must not exceed 16 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    confirmPassword : z.string(),
    accountType: z.enum(["APPLICANT", "EMPLOYER"]),
})
    .refine((data) => data.password === data.confirmPassword,{
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
