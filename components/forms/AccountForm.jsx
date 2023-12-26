"use client";

import Image from "next/image";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateAccountInfo } from "../../lib/actions/user.actions";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import { Loader } from "../index";

import { accountSettingValidation } from "../../lib/validations/auth";

const AccountForm = ({ userId, username, email, projectId }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accountSettingsForm = useForm({
    resolver: zodResolver(accountSettingValidation),
    defaultValues: {
      username: username ? username : "",
      email: email ? email : "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const toastMessage = await updateAccountInfo({
        username: values.username,
        userId: userId,
        path: `/${userId}/projects/${projectId}/account-settings`,
      });
      toast({
        title: toastMessage,
        duration: 2500,
      });
      setIsSubmitting(false);
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
        duration: 2500,
      });

      setIsSubmitting(false);
    }
  };

  return (
    <Form {...accountSettingsForm}>
      <form
        className="mt-4 flex flex-col justify-start gap-7"
        onSubmit={accountSettingsForm.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-8 max-xl:flex-wrap">
          <Image
            src="/assets/images/profile.jpg"
            alt="profile picture"
            width={250}
            height={120}
            className="object-contain rounded-full w-[250px] h-[120px]"
          />

          <FormField
            control={accountSettingsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                  User Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="no-focus border border-[#999]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountSettingsForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="no-focus border border-[#999]"
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className={`${isSubmitting && "btn-submit"}  gap-4`}
          >
            <span>Update</span>
            {isSubmitting && <Loader />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountForm;
