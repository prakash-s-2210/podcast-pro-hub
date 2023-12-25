"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../ui/form";

import { widgetConfigurationValidation } from "../../lib/validations/projects";
import { updateWidgetConfiguration } from "../../lib/actions/project.actions";

import Link from "next/link";

import { widgetConfigurationTab } from "../../constants";

import GeneralTab from "./GeneralTab";
import DisplayTab from "./DisplayTab";

const WidgetConfigurationForm = ({
  projectId,
  tab,
  widgetConfiguration,
}) => {
  const router = useRouter();

  const widgetConfigurationForm = useForm({
    resolver: zodResolver(widgetConfigurationValidation),
    defaultValues: {
      chatbotName: widgetConfiguration?.chatbotName
        ? widgetConfiguration.chatbotName
        : "",
      welcomeMessage: widgetConfiguration?.welcomeMessage
        ? widgetConfiguration.welcomeMessage
        : "",
      inputPlaceholder: widgetConfiguration?.inputPlaceholder
        ? widgetConfiguration.inputPlaceholder
        : "",
      primaryColor: widgetConfiguration?.primaryColor
        ? widgetConfiguration.primaryColor
        : "",
      fontColor: widgetConfiguration?.fontColor
        ? widgetConfiguration.fontColor
        : "",
      fontSize: widgetConfiguration?.fontSize
        ? widgetConfiguration.fontSize
        : null,
      chatHeight: widgetConfiguration?.chatHeight
        ? widgetConfiguration.chatHeight
        : null,
      showSources: widgetConfiguration?.showSources
        ? widgetConfiguration.showSources
        : false,
      chatIconSize: widgetConfiguration?.chatIconSize
        ? widgetConfiguration.chatIconSize
        : "",
      position: widgetConfiguration?.position
        ? widgetConfiguration.position
        : "",
      distanceFromBottom: widgetConfiguration?.distanceFromBottom
        ? widgetConfiguration.distanceFromBottom
        : null,
      horizontalDistance: widgetConfiguration?.horizontalDistance
        ? widgetConfiguration.horizontalDistance
        : null,
      botIcon: widgetConfiguration?.botIcon ? widgetConfiguration.botIcon : "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const toastMessage = await updateWidgetConfiguration({
        chatbotName: values.chatbotName,
        welcomeMessage: values.welcomeMessage,
        inputPlaceholder: values.inputPlaceholder,
        primaryColor: values.primaryColor,
        fontColor: values.fontColor,
        fontSize: values.fontSize,
        chatHeight: values.chatHeight,
        showSources: values.showSources,
        chatIconSize: values.chatIconSize,
        position: values.position,
        distanceFromBottom: values.distanceFromBottom,
        horizontalDistance: values.horizontalDistance,
        botIcon: values.botIcon,
        projectId: projectId,
        path: `/projects/${projectId}/widget-configuration?tab=general`,
      });

      router.push(`/projects/${projectId}/widget-configuration?tab=general`);
      
      toast({
        title: toastMessage,
        duration: 2500,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex border-b-4 border-b-[#DADADA]">
        {widgetConfigurationTab.map((item) => (
          <Link
            href={`/projects/${projectId}/widget-configuration?tab=${item.query}`}
            key={item.label}
            className={`pr-3 text-[22px] ${
              item.query === "advanced" && "pointer-events-none"
            } ${
              tab === item.query
                ? "font-bold text-primary"
                : "font-normal text-[#3C3C3C]"
            }`}
          >
            <p className="px-2">{item.label}</p>

            {tab === item.query && (
              <div className="w-full h-1 bg-primary relative top-1 rounded-3xl"></div>
            )}
          </Link>
        ))}
      </div>

      <Form {...widgetConfigurationForm}>
        <form
          className="mt-4 flex flex-col justify-start gap-7"
          onSubmit={widgetConfigurationForm.handleSubmit(onSubmit)}
        >
          {tab === "general" && (
            <GeneralTab
              widgetConfigurationForm={widgetConfigurationForm}
              projectId={projectId}
            />
          )}

          {tab === "display" && (
            <DisplayTab
              widgetConfigurationForm={widgetConfigurationForm}
              projectId={projectId}
            />
          )}
        </form>
      </Form>
    </>
  );
};

export default WidgetConfigurationForm;
