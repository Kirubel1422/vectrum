"use client";

import { cn } from "@/lib/utils";
import { FileStack, LayoutDashboard, LogOut, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { motion } from "motion/react";
import Image from "next/image";
import { getRole } from "@/lib/utils/getRole";

export function DashboardSidebar({ fullName }: { fullName: string }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const role = await getRole();
      setIsAdmin("admin" == role);
    })();
  }, []);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard/analyze-resume",
      icon: (
        <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      adminOnly: false,
    },
    {
      label: "Profile",
      href: "/dashboard/my-account",
      icon: (
        <UserCog className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      adminOnly: false,
    },
    {
      label: "Resumes",
      href: "/dashboard/resumes",
      icon: (
        <FileStack className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      adminOnly: true,
    },
    {
      label: "Logout",
      href: "/auth/logout",
      icon: (
        <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      adminOnly: false,
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={cn("h-screen fixed")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                if (link.adminOnly) {
                  if (isAdmin) return <SidebarLink key={idx} link={link} />;
                } else {
                  return <SidebarLink key={idx} link={link} />;
                }
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="https://github.com/shadcn.png"
              className="h-7 w-7 shrink-0 rounded-full"
              width={50}
              height={50}
              alt="Avatar"
            />

            <span
              hidden={!open}
              className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
              {fullName}
            </span>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Vectrum
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative dark:text-white z-20 flex items-center py-1 text-2xl mx-auto font-normal text-black"
    >
      V
    </a>
  );
};
