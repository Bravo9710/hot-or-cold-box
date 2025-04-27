"use client";

import FancyBox from "./components/fancyBox";
import { useState, useEffect } from "react";

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
      <header className="bg-blue-900 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">The</h1>
        <h2 className="text-6xl font-extrabold">Hot or Cold Box</h2>
      </header>

      <div className="bg-blue-100 h-16">
        {/* Divider SVG will be placed here */}
      </div>

      <main className="flex-grow flex items-center justify-center">
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
