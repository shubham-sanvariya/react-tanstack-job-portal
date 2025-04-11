import { z } from "zod";

export const loginFormValidation = z.object({
    email: z.string().email("Please Enter a valid email"),
    password: z.string().min(8, "Password must contain 8 to 15 characters")
        .max(15, "Password must not exceed 16 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character")
})