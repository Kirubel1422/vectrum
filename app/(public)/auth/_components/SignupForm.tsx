"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SignUpSchema, TSignUpSchema } from "../_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader } from "lucide-react";
import { BACKEND_ENDPOINT } from "@/lib/constants";
import { toast } from "sonner";
import { useUserStore } from "../_lib/store";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const submit = async (data: TSignUpSchema) => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw Error(errorData.message || "Signup failed");
      }

      toast.success("Succesfully signed up!");

      const userData = (await response.json()).data;

      setUser(userData);

      router.push("/dashboard/analyze-resume");
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("Something went wrong please try again later.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="dark:border-card-border/30 md:w-3/4 w-full border-card-border flex flex-col items-center border rounded-2xl md:px-16 px-8 md:py-10 py-5"
      >
        <h1 className=" text-4xl text-text-700 dark:text-text-100 font-medium mb-9">
          Signup
        </h1>

        <FormDescription className="mb-3 w-full text-left">
          Create an account by writing your credentials.
        </FormDescription>

        <div className="space-y-6 w-full">
          <div className="space-x-2 sm:grid sm:grid-cols-2  space-y-6 sm:space-y-0">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>

                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="First Name"
                      {...field}
                      value={field.value ?? ""}
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
                      className="w-full"
                      placeholder="Last Name"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Email"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Password"
                    {...field}
                    type="password"
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          variant={"default"}
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full mt-5 font-medium"
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Signup
            </span>
          ) : (
            <span>Signup</span>
          )}
        </Button>

        <hr className="my-6 h-px w-full bg-card-border " />

        <Button
          disabled
          variant={"default"}
          className="text-text-500 dark:text-text-500 border-card-border border  bg-white/90 w-full mb-4 hover:bg-white/90 dark:bg-white/80 dark:hover:bg-white/80"
        >
          <Image
            src={"/assets/icons/google.svg"}
            alt="Google Icon"
            width={22}
            height={22}
          />{" "}
          Continue with Google
        </Button>

        <p className="dark:text-text-100 text-text-500 text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary">
            Signin.
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
