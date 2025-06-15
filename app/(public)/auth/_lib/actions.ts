"use server";

import { cookieConfig } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  (await cookies()).set("jwt", "", {
    ...cookieConfig,
    maxAge: 0,
    expires: new Date(0),
  });

  redirect("/");
};
