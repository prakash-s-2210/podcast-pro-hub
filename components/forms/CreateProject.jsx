"use client";

import { useState } from "react";

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

import { Loader } from "../index";

import { projectValidation } from "../../lib/validations/projects";
import { createProject } from "../../lib/actions/project.actions";

const CreateProject = ({userId, path}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectForm = useForm({
    resolver: zodResolver(projectValidation),
    defaultValues: {
      title: "",
    },
  });

  const onCreateProjectSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const toastMessage = await createProject({
        title: values.title,
        userId: userId,
        path: path,
      });
      projectForm.reset();
      
      setIsSubmitting(false);
      setOpen(false);

      toast({
        title: toastMessage,
        duration: 2500,
      });
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
        duration: 2500,
      });
      
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-3 pl-5 pr-8 py-2 bg-[#211935] hover:bg-opacity-80 text-[#F8F8F8] font-semibold rounded-xl">
        <div className="max-sm:hidden w-8 h-8 flex items-center justify-center rounded-full text-[34px] text-[#211935] bg-[#F8F8F8]">
          +
        </div>

        <p className="text-[28px]">Create New Project</p>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-body-bold">Create Project</DialogTitle>
        </DialogHeader>
        <Form {...projectForm}>
          <form
            className="mt-4 flex flex-col justify-start gap-7"
            onSubmit={projectForm.handleSubmit(onCreateProjectSubmit)}
          >
            <FormField
              control={projectForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel className="text-base-semibold text-slate-gray">
                    Enter Project Name:
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

            <div className="flex justify-end items-center gap-5">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="text-[#FF274C] font-bold bg-white hover:bg-white h-8"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className={`${isSubmitting && "btn-submit"} btn-primary gap-2 `}
              >
                <span>Create</span>
                {isSubmitting && <Loader />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
