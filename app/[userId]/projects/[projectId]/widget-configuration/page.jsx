import {
  Sidebar,
  ProjectNavbar,
  WidgetConfigurationForm,
} from "../../../../../components/index";

import { fetchProjectById } from "../../../../../lib/actions/project.actions";

const Page = async ({ params, searchParams }) => {
  const project = await fetchProjectById(params.projectId);

  return (
    <main className="flex">
      <Sidebar userId = {params.userId} projectId={project._id} title={project.title} />

      <section className="flex-1 flex flex-col gap-14  pb-16">
        <ProjectNavbar title={project.title} />

        <div className="px-8 md:px-16 flex flex-col gap-10">
          <h1 className="text-[55px] font-bold text-primary">Configuration</h1>

          <WidgetConfigurationForm
            userId = {params.userId}
            projectId={project._id}
            tab={searchParams.tab}
            widgetConfiguration = {project?.widgetConfiguration}
          />
        </div>
      </section>
    </main>
  );
};

export default Page;
