import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

import Auth from "./Auth";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <header className="w-full p-8 fixed top-0 left-0 z-20 bg-white">
      <nav className="flex justify-between items-center">
        <Link href = "/" className="flex items-center gap-[6px]">
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

        <div className="flex items-center gap-3">
          <Auth />

          <Image
            src="/assets/icons/gear.svg"
            alt="gear"
            width={34}
            height={34}
          />

          <Image
            src="/assets/icons/notification.svg"
            alt="notification"
            width={40}
            height={40}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
