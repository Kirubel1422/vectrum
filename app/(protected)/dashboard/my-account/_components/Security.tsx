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
  ) => Promise<boolean>;
}) => {
  const form = useForm<SecuritySchemaType>({
    resolver: zodResolver(SecuritySchema),
  });

  const onSubmit = async (data: SecuritySchemaType) => {
    const result = await handleChangePassword(
      data.current_password,
      data.new_password
    );
    if (result) {
      toast.success(`Successfully changed your password!`);
    }
  };

  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold text-secondary-500 mb-6">
        Security
      </h2>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>

              <FormControl>
                <Input
                  {...field}
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
              <FormLabel>New Password</FormLabel>

              <FormControl>
                <Input
                  {...field}
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
              <FormLabel>Confirm Password</FormLabel>

              <FormControl>
                <Input
                  {...field}
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
          variant={"secondary"}
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
