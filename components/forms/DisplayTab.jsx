"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const DisplayTab = ({ widgetConfigurationForm, projectId, onFileChange }) => {
  const handleImage = (e, fieldChange) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileChange(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex gap-x-16 gap-y-8 max-xl:flex-wrap">
        <FormField
          control={widgetConfigurationForm.control}
          name="primaryColor"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Primary Color
              </FormLabel>
              <div className="flex items-center gap-5">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="no-focus border border-[#999]"
                    {...field}
                  />
                </FormControl>

                <div
                  className="w-8 h-8 rounded-md"
                  style={{ backgroundColor: `${field.value}` }}
                ></div>
              </div>
              <p className="text-[16px] text-[#646464] mt-0">
                Lorem ipsuim dolor sit Lorem ipsuim dolor sit
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={widgetConfigurationForm.control}
          name="fontColor"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Font Color
              </FormLabel>
              <div className="flex items-center gap-5">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="no-focus border border-[#999]"
                    {...field}
                  />
                </FormControl>

                <div
                  className="w-8 h-8 rounded-md"
                  style={{ backgroundColor: `${field.value}` }}
                ></div>
              </div>
              <p className="text-[16px] text-[#646464] mt-0">
                Lorem ipsuim dolor sit Lorem ipsuim dolor sit
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-x-16 gap-y-8 max-xl:flex-wrap">
        <FormField
          control={widgetConfigurationForm.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Font Size (in px)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
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
          name="chatHeight"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Chat Height (in % of total screen)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
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
      </div>

      <FormField
        control={widgetConfigurationForm.control}
        name="showSources"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between pt-3 pb-10 border-b-4 border-b-[#DADADA]">
            <div className="space-y-0.5">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Show Sources
              </FormLabel>
              <FormDescription className="text-[16px] text-[#646464]">
                Lorem ipsuim dolor sit Lorem ipsuim dolor sit
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <h3 className="text-[20px] font-bold text-primary">Chat Icon</h3>
      <div className="flex gap-x-16 gap-y-8 max-xl:flex-wrap">
        <FormField
          control={widgetConfigurationForm.control}
          name="chatIconSize"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Chat Icon Size
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus">
                    <SelectValue placeholder="Select a chat icon size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="small">Small (48x48 px)</SelectItem>
                  <SelectItem value="medium">Medium (64x64 px)</SelectItem>
                  <SelectItem value="large">Large (96x96 px)</SelectItem>
                  <SelectItem value="extraLarge">
                    Extra Large (128x128 px)
                  </SelectItem>
                  <SelectItem value="custom">Custom Size</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={widgetConfigurationForm.control}
          name="position"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Position on Screen
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus">
                    <SelectValue placeholder="Select a position on screen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bottomRight">Bottom Right</SelectItem>
                  <SelectItem value="bottomLeft">Bottom Left</SelectItem>
                  <SelectItem value="topRight">Top Right</SelectItem>
                  <SelectItem value="topLeft">Top Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-x-16 gap-y-8 max-xl:flex-wrap">
        <FormField
          control={widgetConfigurationForm.control}
          name="distanceFromBottom"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Distance from Bottom (in px)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
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
          control={widgetConfigurationForm.control}
          name="horizontalDistance"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-[20px] font-bold text-[#3C3C3C]">
                Horizontal Distance (in px)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Type here"
                  className="no-focus border border-[#999]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className="flex items-center gap-4">
            <FormLabel className="flex flex-col gap-4">
              <p className="text-[20px] font-bold text-[#3C3C3C]">Bot Icon</p>
              <div className="flex items-center gap-5">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="bot icon"
                    width={48}
                    height={48}
                    priority
                    className="rounded-full object-contain w-12 h-12"
                  />
                ) : (
                  <Image
                    src="/assets/images/default.png"
                    alt="Bot icon"
                    width={48}
                    height={48}
                    className="object-contain rounded-full w-12 h-12"
                  />
                )}

                <div className="flex flex-col gap-2">
                  <Button className="flex items-center gap-2 bg-primary hover:bg-primary rounded-lg px-6 py-3">
                    <p className="text-white font-bold text-[16px]">Upload Image</p>
                    <Image
                      src="/assets/icons/upload-icon.svg"
                      alt="upload"
                      width={20}
                      height={20}
                      className="object-contain rounded-full w-12 h-12"
                    />
                  </Button>

                  <p className="text-[13px] text-[#646464]">Recommended Size: 48X48px</p>
                </div>
              </div>
            </FormLabel>
            <FormControl className="flex-1 text-base-semibold text-gray-200">
              <Input
                type="file"
                accept="image/*"
                className="h-[1px] invisible"
                onChange={(e) => onFileChange(e, field.onChange)}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div>
        <div className="flex justify-end gap-5">
          <Link
            href={`/projects/${projectId}/widget-configuration?tab=general`}
            className="flex justify-end"
          >
            <Button
              type="submit"
              className="bg-white text-primary border-2 border-primary hover:bg-white px-10 text-[20px]"
            >
              Back
            </Button>
          </Link>

          <Button
            type="submit"
            className="bg-primary hover:bg-primary px-10 text-[20px]"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default DisplayTab;
