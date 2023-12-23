"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const ProjectNavbar = ({ title }) => {
  const pathname = usePathname();

  return (
    <nav className="w-full sticky top-0 right-0 py-5 px-8 md:px-16 shadow-lg bg-white z-20 h-fit flex justify-between items-center flex-wrap">
      <div className="flex flex-wrap item-center gap-1 text-[28px]">
        <Image
          src="/assets/icons/nav-home.svg"
          alt="home"
          width={52}
          height={52}
        />
        <p className="relative top-1.5 text-[#999999] font-medium">
          / {title} /
        </p>
        <p className="relative top-1.5 text-primary font-medium">
          {pathname.split("/").pop()}
        </p>
      </div>

      <div className="flex items-center gap-4 max-md:hidden">
        <div className="flex items-center">
          <Image
            src="/assets/icons/arrow-down.svg"
            alt="arrow down"
            width={64}
            height={64}
          />

          <p>EN</p>

          <Image
            src="/assets/icons/flag.svg"
            alt="flag"
            width={50}
            height={50}
            className="ml-3"
          />
        </div>

        <Image
            src="/assets/icons/notification.svg"
            alt="notification"
            width={40}
            height={40}
            className="ml-3"
          />
      </div>
    </nav>
  );
};

export default ProjectNavbar;
