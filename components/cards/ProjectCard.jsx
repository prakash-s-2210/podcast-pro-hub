import Link from "next/link";

import { timeAgo } from "../../lib/utils";

const ProjectCard = ({ userId, project, projects , index }) => {
  const colors = ["bg-blue", "bg-primary", "bg-amber"];
  let coloredArray = [];
  coloredArray = projects.map((_, index) => (
    colors[index % colors.length]));

  return (
    <Link href={`/${userId}/projects/${project._id}/upload`} className="cursor-pointer flex flex-wrap gap-x-7 py-3 pl-[14px] pr-8 border border-[#999] rounded-[26px] project-card-shadow">
      <div
        className={`text-[66px] flex justify-center items-center text-white px-6 py-1 ${coloredArray[index]} rounded-[18px]`}
      >
      {project.title.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('')}
      </div>
      <div className="flex flex-col">
        <p className="pt-6 text-primary text-[25px] font-bold">
          {project.title}
        </p>

        <p className="text-[15px] text-[#3C3C3C]">{project.files.length } {project.files.length > 1 ? "Episodes" : "Episode"}</p>

        <p className="pt-7 text-[15px] text-[#969696]">
          Last edited {timeAgo(project.updatedAt)}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
