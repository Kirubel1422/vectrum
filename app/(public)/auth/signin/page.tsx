import Image from "next/image";
import SigninForm from "../_components/SigninForm";
import { cookies } from "next/headers";
import { JwtService } from "@/lib/service/jwt.service";
import { redirect } from "next/navigation";

export default async function Page() {
  const jwt = (await cookies()).get("jwt");
  let decodedToken = null;

  try {
    if (jwt && jwt.value) {
      decodedToken = JwtService.verify(jwt.value);
    }
  } catch (error) {
    console.error(error);
  }

  if (decodedToken && decodedToken.userId) {
    return redirect("/dashboard/analyze-resume");
  }

  return (
    <div className="grid md:grid-cols-12 min-h-screen">
      <div className="dark:bg-dark-mode md:col-span-4 flex items-center justify-center md:px-12 px-6 bg-white">
        <SigninForm />
      </div>

      <div className="min-h-full md:flex hidden bg-card-border items-center justify-center md:col-span-8">
        <Image
          src={"/assets/sign-in.svg"}
          height={705}
          width={736}
          alt={"Signin Image"}
        />
      </div>
    </div>
  );
}
