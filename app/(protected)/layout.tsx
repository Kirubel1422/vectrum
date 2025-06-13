import { JwtService } from "@/lib/service/jwt.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jwt = (await cookies()).get("jwt");

  if (jwt && jwt.value) {
    try {
      const result = JwtService.verify(jwt.value);
      if (result.userId) {
        return <main>{children}</main>;
      }
    } catch (error) {
      redirect("/auth/signin");
    }
  } else {
    redirect("/auth/signin");
  }
}
