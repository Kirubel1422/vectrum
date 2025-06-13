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
import { SignInSchema, TSignInSchema } from "../_lib/schema";
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

const SigninForm = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
  });

  const submit = async (data: TSignInSchema) => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}auth/signin`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw Error(errorData.message || "Login failed");
      }

      toast.success("Login success", {
        description: "Welcome!",
      });

      setUser((await response.json()).data);

      router.push("/");
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
        {/* PLACEHOLDER FOR LOGO  */}
        <div className="rounded-full w-32 aspect-square mb-5 bg-border" />
        <h1 className=" text-4xl text-text-700 dark:text-text-100 font-medium mb-9">
          Signin
        </h1>

        <FormDescription className="mb-3 w-full text-left">
          Use your credentials to signin.
        </FormDescription>

        <div className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    defaultValue={""}
                    className="w-full"
                    placeholder="Email"
                    {...field}
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
                    defaultValue={""}
                    className="w-full"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end mt-5 w-full">
          <Link href="/auth/forgot-password" className="underline text-primary">
            Forgot password?
          </Link>
        </div>

        <Button
          variant={"default"}
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full mt-5 font-medium"
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Login
            </span>
          ) : (
            <span>Login</span>
          )}
        </Button>

        <hr className="my-6 h-px w-full bg-card-border " />

        <Button
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
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary">
            Signup.
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SigninForm;
