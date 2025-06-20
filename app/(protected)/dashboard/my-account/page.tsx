import { cookies } from "next/headers";
import AccountInfoCard from "./_components/AccountInfoCard";
import General from "./_components/General";
import Security from "./_components/Security";
import { JwtService } from "@/lib/service/jwt.service";
import { redirect } from "next/navigation";
import { User } from "@/lib/types/user.types";
import { readableDateFormat } from "@/lib/utils/dateFormat";
import { AuthService } from "@/lib/service/auth.service";
import { cookieConfig } from "@/lib/constants";
import { GeneralSchemaType } from "./_lib/schema";
import { UserService } from "@/lib/service/user.service";

export default async function page() {
  const jwt = (await cookies()).get("jwt");

  let jwtData = null;

  try {
    jwtData = JwtService.verify(jwt?.value as string) as User & {
      userId: string;
      iat: number;
    };
  } catch (error) {
    redirect("/");
  }

  if (jwtData === null) redirect("/");

  // Handle change password
  const handleChangePassword = async (
    current_password: string,
    new_password: string
  ): Promise<{ success: boolean; message: string; signOut: boolean }> => {
    "use server";
    return await AuthService.changePassword(
      jwtData.email,
      current_password,
      new_password,
      jwtData.userId
    );
  };

  const handleChangeGeneralInfo = async (data: GeneralSchemaType) => {
    "use server";
    const response = await UserService.handleChangeGeneralInfo(data);

    const refreshToken = await AuthService.refreshToken(jwtData.userId);

    (await cookies()).set("jwt", refreshToken, { ...cookieConfig });

    return response;
  };

  const handleLogout = async () => {
    "use server";
    (await cookies()).set("jwt", "", {
      ...cookieConfig,
      expires: new Date(0),
      maxAge: 0,
    });
    redirect("/");
  };

  return (
    <div className="grid grid-cols-12 md:pt-0 pt-12  place-items-center gap-10 md:gap-2 dark:bg-dark-mode min-h-screen">
      <div className="w-full md:col-start-3 col-start-2 md:col-span-4 col-span-10">
        <General
          first_name={jwtData.first_name}
          last_name={jwtData.last_name}
          handleChangeGeneralInfo={handleChangeGeneralInfo}
        />
        <hr className="h-[3px] bg-[#f3f3f3] dark:bg-[#5E5757]/15 my-14" />
        <Security handleChangePassword={handleChangePassword} />
      </div>

      <div className="w-full md:z-0 -z-50 md:col-start-8 col-start-2 col-span-10 md:col-span-full place-self-center">
        <AccountInfoCard
          handleLogout={handleLogout}
          name={jwtData.first_name + " " + jwtData.last_name}
          email={jwtData.email}
          created_at={readableDateFormat(jwtData.created_at as Date)}
        />
      </div>
    </div>
  );
}
