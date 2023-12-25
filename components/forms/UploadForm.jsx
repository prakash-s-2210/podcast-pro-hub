"use client";

import Image from "next/image";

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";

import { uploadValidation } from "../../lib/validations/projects";
import { createFile } from "../../lib/actions/project.actions";

const UploadForm = ({ children, projectId, formTitle, icon }) => {
  const { toast } = useToast();

  const uploadForm = useForm({
    resolver: zodResolver(uploadValidation),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const toastMessage = await createFile({
        title: values.title,
        description: values.description,
        projectId: projectId,
        path: `/projects/${projectId}/upload`,
      });

      uploadForm.reset();

      toast({
        title: toastMessage,
        duration: 2500,
      });
    } catch (error) {
      toast({
        title: "Delete operation failed",
        variant: "destructive",
        duration: 2500,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-body-bold flex items-center gap-5">
            <Image src={icon} width={82} height={82} />

            <p className="text-[30px] font-bold text-[#3C3C3C]">{formTitle}</p>
          </DialogTitle>
        </DialogHeader>
        <Form {...uploadForm}>
          <form
            className="mt-4 flex flex-col justify-start gap-7"
            onSubmit={uploadForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={uploadForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel className="text-base-semibold text-slate-gray">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Type here"
                      className="no-focus border border-slate-gray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={uploadForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel className="text-base-semibold text-slate-gray">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Type here"
                      className="no-focus border border-slate-gray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-5">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="text-[#FF274C] font-bold bg-white hover:bg-white"
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadForm;
