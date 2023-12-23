import Image from "next/image";

import Sidebar from "../../../../components/shared/Sidebar";
import { fetchProjectById } from "../../../../lib/actions/project.actions";
import ProjectNavbar from "../../../../components/shared/ProjectNavbar";
import FileTable from "../../../../components/cards/FileTable";
import UploadForm from "../../../../components/forms/UploadForm"
import {
  uploadOptions,
  defaultUploadOptions,
} from "../../../../constants/index";

import { Button } from "../../../../components/ui/button";

const Page = async ({ params }) => {
  const project = await fetchProjectById(params.id);

  return (
    <main className="flex">
      <Sidebar project={project} />

      <section className="flex-1 flex flex-col gap-14  pb-16">
        <ProjectNavbar title={project.title} />

        <div className="px-8 md:px-16">
          {project.files.length > 0 ? (
            <>
              <h1 className="text-[55px] font-bold text-primary">
                {project.title}
              </h1>

              <div className="pt-11 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {defaultUploadOptions.map((option) => (
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
                ))}
              </div>

              <div className="flex justify-between items-center flex-wrap gap-10 px-10 py-5 bg-primary rounded-2xl mt-10">
                <p className="text-[26px] font-bold leading-[33px] text-white">
                  All files are processed! Your widget is ready to go!
                </p>

                <div className="px-7 py-3 bg-white rounded-md text-[#3C3C3C] text-[21px] leading-[26px] tracking-[0.154px] font-bold cursor-pointer">
                  Try it out!
                </div>
              </div>

              <FileTable project={project} />
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
                  return <UploadForm key={option.label} children = {optionContent} /> ;
                })}
              </div>

              <p className="text-[#999] text-[18px] text-center pt-10 pb-6">
                or
              </p>

              <div className="cursor-pointer flex flex-col items-center border-[4px] border-dashed rounded-[20px] border-[#999]">
                <Image
                  src="/assets/icons/upload.svg"
                  alt="upload"
                  width={128}
                  height={128}
                />

                <p className="text-[#49454F] text-[20px]">
                  Select a file or drag and drop here (Podcast Media or
                  Transcription Text)
                </p>

                <p className="opacity-40 text-[16px]">
                  MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
                </p>

                <Button className="bg-transparent my-8 px-10 py-6 border-2 border-primary rounded-3xl text-[26px] leading-[36px] font-medium text-primary hover:bg-transparent">
                  Select File
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
