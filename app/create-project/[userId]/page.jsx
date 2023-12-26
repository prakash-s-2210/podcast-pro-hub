import Image from "next/image";
import Link from "next/link";

import { CreateProject, Navbar, ProjectCard } from "../../../components/index";
import { fetchProjects } from "../../../lib/actions/project.actions";

const Page = async ({ params }) => {
  let user;
  try{
   user = await fetchProjects(params.userId);
  }
  catch(error){
    console.log(error.message);
  }

  return (
    <>
      <Navbar />

      <section className="px-8 sm:px-32 lg:px-44 pt-[166px] pb-12">
        <Link
          href="/"
          className="hover:home-shadow flex items-center gap-[5px] w-fit px-[14px] py-[6px] border-[0.75px] border-[#999] rounded-[36px]"
        >
          <Image
            src="/assets/icons/home.svg"
            alt="Home"
            width={29}
            height={29}
          />

          <p>Back to Home</p>
        </Link>

        {user?.projects.length > 0 ? (
          <div>
            <div className="flex justify-between items-center flex-wrap">
              <h1 className="head-text my-5">Projects</h1>

              <CreateProject userId = {params.userId} path = {`/create-project/${params.userId}`} />
            </div>

            <div className="flex flex-wrap gap-x-20 gap-y-16 mt-10">
              {user.projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  userId = {user._id}
                  project = {project}
                  projects={user.projects}
                  index={index}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center -mt-3">
              <h1 className="head-text">Create a New Project</h1>

              <Image
                src="/assets/images/not-projects-found.png"
                alt="No projects found"
                width={539}
                height={362}
                className="mt-6"
              />
            </div>

            <p className="text-heading3-normal text-[#838383] mt-8 mb-3 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in
            </p>

            <div className="w-full flex justify-center mt-5">
              <CreateProject userId = {params.userId} path = {`/create-project/${params.userId}`} />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Page;
