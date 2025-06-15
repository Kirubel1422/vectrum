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
import { GeneralSchema, GeneralSchemaType } from "../_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const General = ({
  first_name,
  last_name,
  handleChangeGeneralInfo,
}: {
  first_name: string;
  last_name: string;
  handleChangeGeneralInfo: (
    data: GeneralSchemaType
  ) => Promise<{ message: string; success: boolean }>;
}) => {
  const form = useForm<GeneralSchemaType>({
    resolver: zodResolver(GeneralSchema),
    defaultValues: {
      first_name,
      last_name,
    },
  });

  const onSubmit = async (data: GeneralSchemaType) => {
    const { success, message } = await handleChangeGeneralInfo(data);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <h2 className="text-2xl dark:text-text-100 font-semibold text-secondary-500 mb-6">
        General
      </h2>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-text-100">First Name</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="text"
                  value={field.value ?? undefined}
                  placeholder="Enter your first name"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-text-100">Last Name</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="text"
                  value={field.value ?? undefined}
                  placeholder="Enter your last name"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"default"} className="mt-3" type="submit">
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Save
            </span>
          ) : (
            <span>Save</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default General;
