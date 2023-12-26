import { Sidebar, ProjectNavbar, AccountForm } from "../../../../../components/index";
import { fetchUserById } from "../../../../../lib/actions/user.actions";
import { fetchProjectById } from "../../../../../lib/actions/project.actions";

const Page = async ({ params }) => {
  const user = await fetchUserById(params.userId);
  const project = await fetchProjectById(params.projectId);

  return (
    <main className="flex">
      <Sidebar userId = {params.userId} projectId={project?._id} title={project?.title} />

      <section className="flex-1 flex flex-col gap-14  pb-16">
        <ProjectNavbar title={null} />

        <div className="px-8 md:px-16 flex flex-col gap-8">
          <h1 className="head-text my-5">Account Settings</h1>

          <AccountForm userId = {params.userId} username = {user?.username} email = {user?.email} projectId = {project._id} />

          <div className="flex flex-col">
            <h3 className="head-text">Subscriptions</h3>

            <div className="px-10 py-7 mt-8 bg-primary rounded-2xl flex justify-between items-center gap-5 flex-wrap">
              <p className="text-[28px] text-white font-bold">You are currently on the <span className="underline">Ques AI Basic Plan!</span></p>
              <div className="text-[20px] px-5 py-2 rounded-xl text-primary font-bold bg-white">Upgrade</div>
            </div>

            <p className="text-[#FF274C] text-[20px] font-bold pt-6 underline">Cancel Subscription</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
