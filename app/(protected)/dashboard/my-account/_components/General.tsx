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

const General = ({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) => {
  const form = useForm<GeneralSchemaType>({
    resolver: zodResolver(GeneralSchema),
    defaultValues: {
      first_name,
      last_name,
    },
  });

  const onSubmit = async (data: GeneralSchemaType) => null;
  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold text-secondary-500 mb-6">
        General
      </h2>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="text"
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
              <FormLabel>Last Name</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your last name"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"secondary"} className="mt-3" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default General;
