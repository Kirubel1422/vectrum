import React, { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResumeService } from "@/lib/service/resume.service";
import Link from "next/link";
import { readableDateFormat } from "@/lib/utils/dateFormat";
import { Skeleton } from "@/components/ui/skeleton";

const page = async () => {
  return (
    <div className="dark:bg-dark-mode min-h-screen">
      <div className="max-w-4xl mx-auto pt-12">
        <h1 className="text-3xl mb-7 dark:text-text-100">Resume List</h1>

        <Suspense
          fallback={[...new Array(4)].map((_, i) => (
            <Skeleton className="h-10 mb-6" key={i} />
          ))}
        >
          <ResumeList />
        </Suspense>
      </div>
    </div>
  );
};

const ResumeList = async () => {
  const resumes = await ResumeService.getAllResumes();
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {resumes.map((resume, i) => (
        <ResumeAccordion
          key={`item-${i}`}
          createdAt={resume.created_at}
          cvUrl={resume.resume_url}
          idx={i}
          userId={resume.user_id}
        />
      ))}
    </Accordion>
  );
};
const ResumeAccordion = ({
  idx,
  userId,
  cvUrl,
  createdAt,
}: {
  idx: number;
  userId: string;
  cvUrl: string;
  createdAt: Date;
}) => {
  return (
    <AccordionItem
      value={`item-${idx}`}
      className="bg-slate-800 shadow-sm px-4  rounded-md"
    >
      <AccordionTrigger>USER ID: {userId}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <Link className="bg-primary-700 w-fit px-3" href={cvUrl}>
          Download CV
        </Link>

        <p>{readableDateFormat(createdAt)}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default page;
