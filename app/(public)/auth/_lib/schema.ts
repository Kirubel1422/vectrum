import { PASSWORD_TEST_REGEX } from "@/lib/constants";
import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().regex(PASSWORD_TEST_REGEX, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  }),
});

export const SignUpSchema = SignInSchema.extend({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

export type TSignInSchema = z.infer<typeof SignInSchema>;
export type TSignUpSchema = z.infer<typeof SignUpSchema>;
