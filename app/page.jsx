import Image from "next/image";

import Navbar from "../components/shared/Navbar";

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />

      <div className=" bg-primary relative top-[118px] h-[calc(100vh-118px)] flex justify-center max-sm:items-center">
        <Image
          src="/assets/images/hero.png"
          alt="hero"
          width={595}
          height={554}
          className="max-sm:w-[75%] max-sm:h-1/2"
        />
      </div>
    </main>
  );
}
