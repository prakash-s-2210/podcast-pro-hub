"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

const Sidebar = ({ userId, projectId, title }) => {
  const pathname = usePathname();

  const sidebarLinks = [
    { route: `/${userId}/projects/${projectId}/upload`, label: "Projects" },
    {
      route: `/${userId}/projects/${projectId}/widget-configuration?tab=general`,
      label: "Widget Configurations",
    },
    { route: "null", label: "Deployment" },
    { route: "null", label: "Pricing" },
  ];
  
  return (
    <section className="xl:w-[23%] h-screen custom-scrollbar bg-[#F3E8FF] rounded-r-md sticky top-0 left-0 z-30 flex flex-col justify-between p-4">
      <div className="flex flex-col border-b border-b-[#CAC4D0]">
        <Link
          href="/"
          className="flex items-center gap-[6px] px-[14px] py-[10px]"
        >
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={52}
            height={52}
          />

          <p
            className={`text-primary text-heading3-bolder max-sm:hidden ${jakarta.className}`}
          >
            LAMA.
          </p>
        </Link>

        <p className="px-5 py-6 text-[18px] font-medium leading-[26px] text-[#49454F]">
          {pathname.includes("upload") ? "Podcast Upload Flow" : title}
        </p>

        <div className="flex flex-col">
          {sidebarLinks.map((link, index) => (
            <Link
              href={link.route}
              key={link.label}
              className={`py-4 px-[10px] flex items-center gap-2 ${
                index > 1 && "pointer-events-none"
              } ${
                pathname === link.route ||
                link.route.startsWith(pathname) ||
                (link.route === `/${userId}/projects/${projectId}/upload` &&
                  pathname.startsWith(`/${userId}/projects/${projectId}/files`))
                  ? "bg-primary rounded-[132px]"
                  : ""
              }`}
            >
              <div
                className={`w-8 h-8 text-[18px] leading-[26px] font-semibold rounded-full flex justify-center items-center ${
                  pathname === link.route ||
                  link.route.startsWith(pathname) ||
                  (link.route === `/${userId}/projects/${projectId}/upload` &&
                    pathname.startsWith(
                      `/${userId}/projects/${projectId}/files`
                    ))
                    ? " bg-black text-white"
                    : "text-[#3C3C3C] bg-[#1D1B20] bg-opacity-15"
                }`}
              >
                {index + 1}
              </div>

              <p
                className={`text-[18px] leading-[26px] ${
                  pathname === link.route ||
                  link.route.startsWith(pathname) ||
                  (link.route === `/${userId}/projects/${projectId}/upload` &&
                    pathname.startsWith(
                      `/${userId}/projects/${projectId}/files`
                    ))
                    ? " text-white font-semibold"
                    : "text-[#49454F] font-medium"
                }`}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Link
        href={`/${userId}/projects/${projectId}/account-settings`}
        className={`pt-5 pb-4 px-3 flex items-center gap-2 border-t border-t-[#CAC4D0] ${
          pathname ===
            `/${userId}/projects/${projectId}/account-settings` && "bg-primary rounded-[132px]"
        }`}
      >
        {pathname === `/${userId}/projects/${projectId}/account-settings` ? (
          <Image
            src="/assets/icons/gear-dark.svg"
            alt="gear"
            width={32}
            height={32}
          />
        ) : (
          <Image
            src="/assets/icons/setting-gear.svg"
            alt="gear"
            width={32}
            height={32}
          />
        )}

        <p
          className={`text-[18px] leading-[26px] tracking-[0.133px] ${
            pathname ===
            `/${userId}/projects/${projectId}/account-settings`
              ? " text-white font-semibold"
              : "text-[#49454F] font-medium"
          }`}
        >
          Settings
        </p>
      </Link>
    </section>
  );
};

export default Sidebar;
