"use client";

import Link from "next/link";

import { useState } from "react";

import { formatDate } from "../../lib/utils";
import { deleteFile } from "../../lib/actions/project.actions";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import { Loader } from "../index";

const FileTableCard = ({
  userId,
  projectId,
  id,
  title,
  updatedAt,
  length,
  index,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting ] = useState(false);

  const handleDelete = async (fileId) => {
    try {
      setIsSubmitting(true);
      const path = `/projects/${projectId}/upload`;
      const toastMessage = await deleteFile({ fileId, projectId, path });

      toast({
        title: toastMessage,
        duration: 2500,
      });

      setIsSubmitting(false);
      setOpen(false);
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
    <tr key={title + index}>
      <td className={`${length === index + 1 && "border-b-0"}`}>{title}</td>
      <td className={`${length === index + 1 && "border-b-0"}`}>
        {formatDate(updatedAt)}
      </td>
      <td className={`${length === index + 1 && "border-b-0"}`}>Done</td>
      <td className={`${length === index + 1 && "border-b-0"}`}>
        <div className="w-fit p-0 flex justify-evenly border border-[#D9D9D9] rounded-md ">
          <Link
            href={`/${userId}/projects/${projectId}/files/${id}/transcript`}
          >
            <Button className="hover:bg-slate-100 bg-transparent px-6 py-[14px] rounded-none border-r border-r-[#D9D9D9] text-[#3C3C3C]  text-[17px] font-medium">
              Edit
            </Button>
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
              <div className="h-full flex items-center hover:bg-slate-100 bg-transparent px-6  text-[#FF274C]  text-[17px] font-medium">
                Delete
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl py-14">
              <DialogHeader>
                <DialogTitle className="text-body-bold flex flex-col gap-10 items-center">
                  <p>Are you sure, you want to delete this file ?</p>

                  <div className="w-fit p-0 flex gap-4">
                    <DialogClose asChild>
                      <Button className="border border-[#999] bg-transparent px-6 py-[14px]  text-[#3C3C3C] hover:bg-transparent text-[17px] font-medium">
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button
                      type="button"
                      onClick={() => handleDelete(id)}
                      className={`text-white bg-transparent px-6 py-[14px] bg-[#FF274C] hover:bg-[#FF274C] text-[17px] font-medium ${
                        isSubmitting && "btn-submit"
                      } btn-primary gap-4`}
                    >
                      <span>Delete</span>
                      {isSubmitting && <Loader />}
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  );
};

export default FileTableCard;
