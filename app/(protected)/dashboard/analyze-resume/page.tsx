"use server";

import Image from "next/image";
import CVAnalysisForm from "./_components/cv-analysis-form";
import CVAnalysisWrapper from "./_components/analysis-wrapper";

export default async function Page() {
  return (
    <div className="flex md:pt-20 sm:pt-16 pt-12 flex-col dark:bg-dark-mode justify-center md:gap-32 gap-24 min-h-screen pb-40">
      <div className="flex md:flex-row flex-col items-center md:items-start justify-center md:gap-28">
        <Image
          src={"/assets/business-man.svg"}
          width={343}
          height={487}
          alt="Business Man"
        />

        <div className="md:px-0 px-12">
          <h2 className="text-text-700 dark:text-text-100 text-[40px] mb-8">
            Apply with{" "}
            <span className="bg-gradient-to-r from-[#3f51b5] to-[#03a9f4] bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>

          <CVAnalysisForm />
        </div>
      </div>

      <hr className="block md:hidden mx-12" />

      <CVAnalysisWrapper />
    </div>
  );
}
