"use client";

import { formatDate } from "../../lib/utils";

import { Button } from "../ui/button";

const FileTable = ({ project }) => {
  return (
    <div className="border border-[#999] rounded-[21px] mt-10">
      <table className="w-full  ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Upload Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {project?.files.map((file) => (
          <tr>
            <td>{project.title}</td>
            <td>{formatDate(file.updatedAt)}</td>
            <td>Done</td>
            <td>
              <div className="w-fit p-0 flex justify-evenly border border-[#D9D9D9] rounded-md ">
                <Button className="bg-transparent px-6 py-[14px] rounded-none border-r border-r-[#D9D9D9] text-[#3C3C3C] hover:bg-transparent text-[17px] font-medium">Edit</Button>

                <Button className="bg-transparent px-6 py-[14px] text-[#FF274C] hover:bg-transparent text-[17px] font-medium">Delete</Button>
              </div>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
