"use server";

import Image from "next/image";
import CVAnalysisForm from "./_components/cv-analysis-form";
import CVAnalysisWrapper from "./_components/analysis-wrapper";

export default async function Page() {
  return (
    <div className="flex flex-col justify-center gap-32 min-h-screen pb-40">
      <div className="flex items-start justify-center gap-28">
        <Image
          src={"/assets/business-man.svg"}
          width={343}
          height={487}
          alt="Business Man"
        />

        <div>
          <h2 className="text-text-700 text-[40px] mb-8">
            Let me help you get your{" "}
            <span className="text-primary-500">dream job</span>
          </h2>
          <CVAnalysisForm />
        </div>
      </div>

      <CVAnalysisWrapper />
    </div>
  );
}
