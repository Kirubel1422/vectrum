"use client";

import React from "react";
import { useCVAnalysisStore } from "../_lib/store";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getImportanceColor } from "../_lib/utils";
import { Rocket } from "lucide-react";

const AnalysisWrapper = () => {
  const { analysis } = useCVAnalysisStore();
  if (!analysis) return <></>;

  const CVAnalysis = JSON.parse(analysis); // TODO: add typing
  console.log(CVAnalysis);
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-text-700  text-lg text-[40px] font-medium mb-6 gap-3 flex items-center">
        <Rocket className=" fill-highlight-500 text-highlight-800" size={55} />{" "}
        Boosting Your <span className="text-secondary-500">Career</span>
      </h3>

      <div className="flex items-start justify-center gap-40 w-full">
        <div className="bg-[#EFEFEF] lg:w-[620px] max-h-[550px] !accent-primary-500 overflow-y-scroll rounded-2xl py-5 px-9">
          <div className="flex items-start justify-start gap-5">
            <Image
              src={"/assets/chat-avatar.svg"}
              width={42}
              height={42}
              alt="chat-avatar"
            />

            <div className="w-full space-y-5 text-text-700">
              <Progress
                indicatorClassName="!from-primary-500 !to-secondary-500 !bg-gradient-to-r rounded-2xl"
                value={parseInt(CVAnalysis.match_score.percentage)}
                className="bg-[#D9D9D9] h-7 w-full !py-1 rounded-2xl"
                valueClassName="text-white !font-semibold"
              />

              <div
                dangerouslySetInnerHTML={{
                  __html: CVAnalysis.match_score.summary,
                }}
              />

              <div className="space-y-1">
                <h3 className="text-text-700  text-lg font-semibold">
                  Professional Summary
                </h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: CVAnalysis.professional_summary,
                  }}
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-text-700  text-lg font-semibold">
                  {CVAnalysis.feedback_summary.title}
                </h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: CVAnalysis.feedback_summary.top_recommendations,
                  }}
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-text-700  text-lg font-semibold">
                  Missing Skills
                </h3>

                <ol className="space-y-2">
                  {CVAnalysis.missing_skills.map(
                    (
                      skills: any // TODO: fix type
                    ) => (
                      <li className=" list-decimal" key={skills.skill}>
                        <h4 className="text-text-700 font-semibold">
                          {skills.skill}
                          <Badge
                            className={cn(
                              "!rounded-full font-medium h-5 px-2 w-auto ml-1",
                              getImportanceColor(skills.importance).bgColor,
                              getImportanceColor(skills.importance).textColor
                            )}
                            variant={"default"}
                          >
                            {skills.importance}
                          </Badge>
                        </h4>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: skills.recommendation,
                          }}
                        />
                      </li>
                    )
                  )}
                </ol>

                <div
                  dangerouslySetInnerHTML={{
                    __html: CVAnalysis.professional_summary,
                  }}
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-text-700  text-lg font-semibold">
                  Suggested Qualities
                </h3>

                <ol className="space-y-2">
                  {CVAnalysis.suggested_qualities.map(
                    (
                      suggested_quality: any // TODO: fix type
                    ) => (
                      <li
                        className=" list-decimal"
                        key={suggested_quality.quality}
                      >
                        <h4 className="text-text-700 font-semibold">
                          {suggested_quality.quality}
                        </h4>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: suggested_quality.justification,
                          }}
                        />
                      </li>
                    )
                  )}
                </ol>
              </div>

              <div className="space-y-1">
                <h3 className="text-text-700  text-lg font-semibold">
                  Content Opportunities
                </h3>

                <ol className="space-y-2">
                  {CVAnalysis.content_opportunities.map(
                    (
                      content_opportunity: any // TODO: fix type
                    ) => (
                      <li
                        className=" list-decimal"
                        key={content_opportunity.original_phrase}
                      >
                        <h4 className="text-text-700 font-semibold">
                          {content_opportunity.original_phrase}
                        </h4>

                        <div className="mt-1">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: content_opportunity.rationale,
                            }}
                          />

                          <p
                            dangerouslySetInnerHTML={{
                              __html: content_opportunity.rewording,
                            }}
                          />
                        </div>
                      </li>
                    )
                  )}
                </ol>
              </div>

              <div className="space-y-1">
                <h3 className="text-text-700  text-lg font-semibold">
                  Research Notes
                </h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: CVAnalysis.research_notes,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Image
          alt="Seated Business Man"
          src={"/assets/seated-business-man.svg"}
          width={326}
          height={408}
        />
      </div>
    </div>
  );
};

export default AnalysisWrapper;
