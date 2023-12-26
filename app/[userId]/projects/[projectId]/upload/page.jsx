import Image from "next/image";

import { Sidebar, ProjectNavbar, FileTableCard, UploadForm } from "../../../../../components/index";

import { fetchProjectById } from "../../../../../lib/actions/project.actions";
import {
  uploadOptions,
  defaultUploadOptions,
} from "../../../../../constants/index";

const Page = async ({ params }) => {
  const project = await fetchProjectById(params.projectId);

  let dropOptionContent = (
    <div className="cursor-pointer flex flex-col items-center border-[4px] border-dashed rounded-[20px] border-[#999] w-full">
      <Image
        src="/assets/icons/upload.svg"
        alt="upload"
        width={128}
        height={128}
      />

      <p className="text-[#49454F] text-[20px]">
        Select a file or drag and drop here (Podcast Media or Transcription
        Text)
      </p>

      <p className="opacity-40 text-[16px]">
        MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
      </p>

      <div className="bg-transparent my-8 px-10 py-2 border-2 border-primary rounded-3xl text-[26px] leading-[36px] font-medium text-primary hover:bg-transparent">
        Select File
      </div>
    </div>
  );

  return (
    <main className="flex">
      <Sidebar userId = {params.userId} projectId={project._id} title={project.title} />

      <section className="flex-1 flex flex-col gap-14  pb-16">
        <ProjectNavbar title={project.title} />

        <div className="px-8 md:px-16">
          {project.files.length > 0 ? (
            <>
              <h1 className="text-[55px] font-bold text-primary">
                {project.title}
              </h1>

              <div className="pt-11 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {defaultUploadOptions.map((option) => {
                  let optionContent = (
                    <div
                      key={option.label}
                      className="upload-shadow cursor-pointer p-6 border border-[#999] rounded-[22px] flex items-center gap-7"
                    >
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={64}
                        height={64}
                      />

                      <p className="text-[19px] leading-[23px] tracking-[0.137px] font-bold text-[#3C3C3C]">
                        {option.label}
                      </p>
                    </div>
                  );
                  return (
                    <UploadForm
                      key={option.label}
                      children={optionContent}
                      projectId={project._id}
                      formTitle={`Upload from ${option.platform}`}
                      icon={option.icon}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between items-center flex-wrap gap-10 px-10 py-5 bg-primary rounded-2xl mt-10">
                <p className="text-[26px] font-bold leading-[33px] text-white">
                  All files are processed! Your widget is ready to go!
                </p>

                <div className="px-7 py-3 bg-white rounded-md text-[#3C3C3C] text-[21px] leading-[26px] tracking-[0.154px] font-bold cursor-pointer">
                  Try it out!
                </div>
              </div>

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
                    {project?.files.map((file, index) => (
                      <FileTableCard key={file.title+index} userId = {params.userId} projectId={project._id} id = {file._id} title= {file.title} updatedAt = {file.updatedAt} length = {project.files.length} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>

              
            </>
          ) : (
            <>
              <h1 className="text-[55px] font-bold text-primary">Upload</h1>

              <div className="pt-11 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {uploadOptions.map((option) => {
                  let optionContent = (
                    <div
                      key={option.label}
                      className="upload-shadow cursor-pointer p-6 border border-[#999] rounded-[22px] flex items-center gap-7"
                    >
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={64}
                        height={64}
                      />

                      <p className="text-[19px] leading-[23px] tracking-[0.137px] font-bold text-[#3C3C3C]">
                        {option.label}
                      </p>
                    </div>
                  );
                  return (
                    <UploadForm
                      key={option.label}
                      children={optionContent}
                      projectId={project._id}
                      formTitle={`Upload from ${option.platform}`}
                      icon={option.icon}
                    />
                  );
                })}
              </div>

              <p className="text-[#999] text-[18px] text-center pt-10 pb-6">
                or
              </p>

              <UploadForm
                children={dropOptionContent}
                projectId={project._id}
                formTitle={`Upload from Media or Text file`}
                icon="/assets/icons/default.svg"
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
