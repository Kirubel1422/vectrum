import { PASSWORD_TEST_REGEX } from "@/lib/constants";
import { z } from "zod";

export const GeneralSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

export const SecuritySchema = z
  .object({
    current_password: z.string().regex(PASSWORD_TEST_REGEX, {
      message:
        "Current password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    new_password: z.string().regex(PASSWORD_TEST_REGEX, {
      message:
        "New password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    confirm_new_password: z.string().regex(PASSWORD_TEST_REGEX, {
      message:
        "Confirm new password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "New password and confirm new password must match",
  });

export type GeneralSchemaType = z.infer<typeof GeneralSchema>;
export type SecuritySchemaType = z.infer<typeof SecuritySchema>;
