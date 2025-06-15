import { DashboardSidebar } from "@/components/shared/Sidebar";
import { cookieConfig } from "@/lib/constants";
import { JwtService } from "@/lib/service/jwt.service";
import { User } from "@/lib/types/user.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jwt = (await cookies()).get("jwt");

  if (jwt && jwt.value) {
    try {
      const result = JwtService.verify(jwt.value) as User & {
        userId: string;
        iat: number;
      };
      if (result.userId) {
        return (
          <div className="flex">
            <DashboardSidebar
              fullName={result.first_name + " " + result.last_name}
            />
            <main className="w-full">{children}</main>
          </div>
        );
      }
    } catch (error) {
      redirect("/auth/signin");
    }
  } else {
    redirect("/auth/signin");
  }
}
