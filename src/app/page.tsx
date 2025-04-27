"use client";

import FancyBox from "./components/fancyBox";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#021024] text-white pt-[66px] pb-[91px] text-center">
        <h1 className="text-5xl font-medium tracking-[0.2em] leading-[60px] text-[#36FCF0]">
          THE
        </h1>
        <h2 className="text-6xl font-extrabold">Hot or Cold Box</h2>
      </header>

      <div
        className="bg-no-repeat bg-center bg-cover w-100% h-[218px] mt-[-20px]"
        style={{ backgroundImage: "url('/images/layer.svg')" }}></div>

      <main className="flex-grow flex items-center justify-center py-[120px]">
        <FancyBox
          isMobile={isMobile}
          srp={96.5}
          rtp={99.5}
          gameRtp={89}
          operatorLogo="/images/casino-logo.png"
          providerLogo="/images/user-logo.png"
          gameThumbnail="/images/slot-logo.png"
        />
      </main>
    </div>
  );
}
