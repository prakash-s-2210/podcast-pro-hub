import {
  fetchFileById,
  fetchProjectById,
} from "../../../../../../lib/actions/project.actions";
import {
  Sidebar,
  ProjectNavbar,
  TranscriptForm,
} from "../../../../../../components/index";

const Page = async ({ params }) => {
  const file = await fetchFileById(params.fileId);
  const project = await fetchProjectById(params.id);

  return (
    <main className="flex">
      <Sidebar id={project._id} title={project.title} />

      <section className="flex-1 flex flex-col gap-14  pb-16">
        <ProjectNavbar title={project.title} />

        <div className="px-8 md:px-16 flex-1">
          <TranscriptForm projectId = {project._id} id = {file._id} title = {file.title} description = {file.description}  />
        </div>
      </section>
    </main>
  );
};

export default Page;
