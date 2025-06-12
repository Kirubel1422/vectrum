"use server";

import Image from "next/image";
import SignUpForm from "../_components/SignupForm";

const page = () => {
  return (
    <div className="grid md:grid-cols-12 md:min-h-screen">
      <div className="dark:bg-dark-mode md:col-span-4 flex items-center justify-center md:px-12 px-6 bg-white">
        <SignUpForm />
      </div>

      <div className="min-h-full bg-card-border flex items-center justify-center md:col-span-8">
        <Image
          src={"/assets/sign-up.svg"}
          height={705}
          width={736}
          alt={"Signup Image"}
        />
      </div>
    </div>
  );
};

export default page;
