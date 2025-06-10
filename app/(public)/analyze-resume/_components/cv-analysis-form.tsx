"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { CVAnalysisSchema, CVAnalysisSchemaType } from "../_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { BACKEND_ENDPOINT } from "@/lib/constants/endpoints";

const CVAnalysisForm = () => {
  const form = useForm<CVAnalysisSchemaType>({
    resolver: zodResolver(CVAnalysisSchema),
  });

  const submit = async (data: CVAnalysisSchemaType) => {
    const formData = new FormData();

    formData.append("cv", data.cv);
    formData.append("jobDescription", data.jobDescription);

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/analyze`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <FormField
          name="jobDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="jobDescription">Job Description *</FormLabel>

              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="Paste job description here"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="cv"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="cv">Resume *</FormLabel>

              <FormControl>
                <Input
                  accept=".docx, .doc, .pdf"
                  name="cv"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          size="lg"
          variant={"secondary"}
          type="submit"
        >
          <Zap />
          Start
        </Button>
      </form>
    </Form>
  );
};

export default CVAnalysisForm;
