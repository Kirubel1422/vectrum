import { z } from "zod";

const PASSWORD_TEST_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

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
});
