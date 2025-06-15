"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SecuritySchema, SecuritySchemaType } from "../_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const Security = ({
  handleChangePassword,
}: {
  handleChangePassword: (
    current_password: string,
    new_password: string
  ) => Promise<{ success: boolean; message: string; signOut: boolean }>;
}) => {
  const form = useForm<SecuritySchemaType>({
    resolver: zodResolver(SecuritySchema),
  });

  const onSubmit = async (data: SecuritySchemaType) => {
    const result = await handleChangePassword(
      data.current_password,
      data.new_password
    );
    if (result.signOut) {
      console.log("Should sign out the user now");
    }

    if (result.success) {
      toast.success(result.message || `Successfully changed your password!`);
    } else {
      toast.error(result.message || "Failed to change your password!");
    }
  };

  return (
    <Form {...form}>
      <h2 className="text-2xl dark:text-text-100 font-semibold text-secondary-500 mb-6">
        Security
      </h2>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-text-100">
                Current Password
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type="password"
                  placeholder="Enter your current password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-text-100">New Password</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type="password"
                  placeholder="Enter your new password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-text-100">
                Confirm Password
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type="password"
                  placeholder="Confirm new password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          variant={"default"}
          className="mt-3"
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Change Password
            </span>
          ) : (
            <span>Change Password</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Security;
