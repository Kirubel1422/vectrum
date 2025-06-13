"use server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";

const AccountInfoCard = ({
  email,
  name,
  created_at,
  handleLogout,
}: {
  email: string;
  name: string;
  created_at: string;
  handleLogout: () => void;
}) => {
  const infos = [
    {
      label: "Email",
      value: email,
    },
    {
      label: "Name",
      value: name,
    },
    {
      label: "Member Since",
      value: created_at,
    },
    {
      label: "Last Login",
      value: "asfasf",
    },
  ];

  return (
    <Card className="dark:bg-dark-mode md:w-3/4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-secondary-500 dark:text-text-100 ">
          Account Information
        </CardTitle>
        <CardDescription>
          Your account information is listed here.
        </CardDescription>
        <CardAction>
          <Button onClick={handleLogout} variant={"outline"}>
            <LogOut /> Logout
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {infos.map((info, i) => (
          <p
            className="text-text-500 flex items-center justify-between"
            key={`info-${i}`}
          >
            <span className="dark:text-text-300">{info.label}</span>

            <span className="font-semibold text-lg dark:text-text-200">
              {info.value}
            </span>
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
