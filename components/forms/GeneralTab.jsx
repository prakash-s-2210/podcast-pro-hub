"use client";

import Link from "next/link";

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

const GeneralTab = ({ widgetConfigurationForm, projectId }) => {
  return (
    <>
      <FormField
        control={widgetConfigurationForm.control}
        name="chatbotName"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-1">
            <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
              Chatbot Name
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Type here"
                className="no-focus border border-[#999]"
                {...field}
              />
            </FormControl>
            <p className="text-[16px] text-[#646464] mt-0">
              Lorem ipsuim dolor sit Lorem ipsuim dolor sit
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={widgetConfigurationForm.control}
        name="welcomeMessage"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-1">
            <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
              Welcome Message
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Type here"
                className="no-focus border border-[#999]"
                {...field}
              />
            </FormControl>
            <p className="text-[16px] text-[#646464] mt-0">
              Lorem ipsuim dolor sit Lorem ipsuim dolor sit
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={widgetConfigurationForm.control}
        name="inputPlaceholder"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-1">
            <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
              Input Placeholder
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Type here"
                className="no-focus border border-[#999]"
                {...field}
              />
            </FormControl>
            <p className="text-[16px] text-[#646464] mt-0">
              Lorem ipsuim dolor sit Lorem ipsuim dolor sit
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <Link href={`/projects/${projectId}/widget-configuration?tab=display`}  className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary hover:bg-primary px-10 text-[20px]"
        >
          Next
        </Button>
      </Link>
    </>
  );
};

export default GeneralTab;
