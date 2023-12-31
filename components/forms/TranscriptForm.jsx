"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

import { Loader } from "../index";

import { uploadValidation } from "../../lib/validations/projects";
import { updateFile } from "../../lib/actions/project.actions";

const TranscriptForm = ({ userId, projectId, id, title, description }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const transcriptForm = useForm({
    resolver: zodResolver(uploadValidation),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const onTranscriptSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const toastMessage = await updateFile({
        title: values.title,
        description: values.description,
        fileId: id,
        path: `/${userId}/projects/${projectId}/upload`,
      });
      toast({
        title: toastMessage,
        duration: 2500,
      });
      setIsSubmitting(false);
      setIsEditing(!isEditing);
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
        duration: 2500,
      });
      setIsSubmitting(false);
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="h-full flex flex-col gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-[55px] font-bold text-primary">Edit Transcript</h1>

        <Link
          href={`/${userId}/projects/${projectId}/upload`}
          className="flex items-center gap-2 rounded-lg bg-primary hover:bg-opacity-70 text-white px-5 py-2"
        >
          <Image
            src="/assets/icons/arrow-left.svg"
            alt="pen"
            width={22}
            height={22}
          />

          <p className="text-[20px] font-bold">Back to files</p>
        </Link>
      </div>

      <div className="min-h-80 border-2 border-[#7E22CE] rounded-[20px] pl-5 pr-8 pt-4 pb-8 flex flex-col gap-6">
        <Button
          type="button"
          className="flex items-center gap-1 w-fit bg-[#4b4b4b] rounded-[113px] hover:bg-opacity-90 hover:bg-[#4b4b4b]"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Image src="/assets/icons/pen.svg" alt="pen" width={22} height={22} />

          <p className="text-[16px]">Edit Mode</p>
        </Button>

        <div className="h-full">
          {isEditing ? (
            <Form {...transcriptForm}>
              <form onSubmit={transcriptForm.handleSubmit(onTranscriptSubmit)}>
                <div className="flex justify-end gap-3">
                  <Button
                   type="button"
                    className="px-8 py-4 border-2 border-[#FF274C] text-[20px] text-[#FF274C] hover:bg-slate-100 hover:home-shadow font-semibold bg-white"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    Discard
                  </Button>

                  <Button
                    type="submit"
                    className={`${
                      isSubmitting && "btn-submit"
                    }  px-6 py-4 text-[20px] gap-4`}
                  >
                    <span className="text-[20px]  font-semibold">
                      Save & exit
                    </span>
                    {isSubmitting && <Loader />}
                  </Button>
                </div>
                <FormField
                  control={transcriptForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-col mt-5">
                      <FormLabel className="text-base-semibold text-slate-gray font-bold text-[24px]">
                        Title:
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type here"
                          className="no-focus text-primary font-bold text-[24px] border-[#999] mt-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={transcriptForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-col mt-8">
                      <FormLabel className="text-base-semibold text-slate-gray font-bold text-[24px]">
                        Description:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={15}
                          {...field}
                          className="custom-scrollbar no-focus text-[24px] border-[#999]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <>
              <h3 className="text-[24px] text-primary font-bold">{title}</h3>

              <p className="text-[24px] pt-2">{description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptForm;
