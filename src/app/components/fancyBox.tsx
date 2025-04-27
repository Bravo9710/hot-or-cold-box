"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type FancyBoxProps = {
  isMobile: boolean;
  srp: number;
  rtp: number;
  gameRtp: number;
};

const FancyBox: React.FC<FancyBoxProps> = ({ isMobile, srp, rtp, gameRtp }) => {
  const [gameTemperature, setGameTemperature] = useState("");
  const [rtpState, setRtpState] = useState(() => (gameRtp - srp).toFixed(2));
  const [flakePos, setFlakePos] = useState({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);
  const progressValue = 80;

  useEffect(() => {
    const calculateRtpState = () => (gameRtp - srp).toFixed(2);
    const newRtpState = calculateRtpState();
    setRtpState(newRtpState);

    if (parseFloat(newRtpState) > 0) {
      setGameTemperature("Hot");
    } else {
      setGameTemperature("Cold");
    }
  }, [srp, gameRtp]);

  useEffect(() => {
    if (!gameTemperature) return; // Wait until gameTemperature is set

    const path = pathRef.current;
    if (!path) return;
    progress.set(0);

    const totalLength = path.getTotalLength();
    const controls = animate(progress, progressValue, {
      duration: 2,
      ease: "easeInOut",
    });

    const unsubscribe = progress.on("change", (latest) => {
      const point = path.getPointAtLength((latest / 100) * totalLength);
      setFlakePos({ x: point.x, y: point.y });
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [progress, isMobile, gameTemperature]);

  const dashOffset = useTransform(progress, (p) => {
    const totalLength = pathRef.current?.getTotalLength() ?? 0;
    return totalLength * (1 - p / 100);
  });

  return (
    <div className="box bg-[#0B1B32] md:bg-[#021024] text-white rounded-[20px] md:rounded-4xl max-w-sm md:min-w-[398px] mx-auto">
      {!isMobile && (
        <div className="box-head flex justify-between items-center p-4 pb-2">
          <div className="flex justify-center items-center">
            <Image
              src="/images/casino-logo.png"
              alt="Casino logo"
              className="rounded-full height-auto"
              width={36}
              height={36}
            />
            <div className="font-[SFPro] font-weight-500 ml-2">
              <span className="block text-xs text-[#607E9D]">Casino</span>
              <span className="block text-sm">BlueChip</span>
            </div>
          </div>
          <div className="w-[2px] h-[28px] bg-white opacity-10"></div>
          <div className="flex justify-center items-center">
            <div className="font-[SFPro] font-weight-500 mr-2 text-right">
              <span className="block text-xs text-[#607E9D]">Created by</span>
              <span className="block text-sm">Netent</span>
            </div>
            <Image
              src="/images/user-logo.png"
              alt="Creator logo"
              className="rounded-full"
              width={36}
              height={36}
            />
          </div>
        </div>
      )}

      <div className="box-body md:p-7 pt-2 md:pt-0 max-md:bg-[#021024] rounded-3xl">
        <div className="text-center pb-4">
          <div className="relative max-w-[185px] md:max-w-[350px] h-[185px] md:h-[350px] md:mt-[-60px] mb-[-40px] md:mb-[-105px] mx-auto">
            <svg
              viewBox={isMobile ? "0 0 185 185" : "0 0 350 350"}
              className="relative w-[185px] md:w-[350px] h-[185px] md:h-[350px]">
              <defs>
                {gameTemperature && (
                  <linearGradient id="gradient" gradientTransform="rotate(40)">
                    {gameTemperature === "Cold" ? (
                      <>
                        <stop offset="0%" stopColor="#5FFACB" />
                        <stop offset="20%" stopColor="#36FCF0" />
                        <stop offset="80%" stopColor="#0100FF" />
                        <stop offset="100%" stopColor="#0100C8" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor="#E90000" />
                        <stop offset="20%" stopColor="#FF952B" />
                        <stop offset="80%" stopColor="#FF952B" />
                        <stop offset="100%" stopColor="#E90000" />
                      </>
                    )}
                  </linearGradient>
                )}
              </defs>
              <path
                d={
                  isMobile
                    ? "M 25 126 A 75 75 62 1 1 157 126"
                    : "M 82 223 A 102 102 62 1 1 262 223"
                }
                fill="none"
                stroke="#1e293b"
                strokeWidth={isMobile ? "11" : "18"}
                strokeLinecap="round"
              />
              {["none", "blur(3.5px)"].map((blur, index) => (
                <motion.path
                  key={index}
                  ref={pathRef}
                  d={
                    isMobile
                      ? "M 25 126 A 75 75 62 1 1 157 126"
                      : "M 82 223 A 102 102 62 1 1 262 223"
                  }
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth={isMobile ? "11" : "18"}
                  strokeLinecap="round"
                  strokeDasharray={isMobile ? "310" : "420"}
                  style={{
                    filter: blur === "none" ? undefined : blur,
                    strokeDashoffset: dashOffset,
                  }}
                />
              ))}
              {!isMobile && (
                <motion.path
                  d="M 82 223 A 102 102 62 1 1 262 223"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeDasharray="420"
                  style={{
                    filter: "blur(30px)",
                    strokeDashoffset: dashOffset,
                  }}
                />
              )}
            </svg>

            {gameTemperature && (
              <motion.img
                src={
                  gameTemperature === "Cold"
                    ? "/images/snowflake.svg"
                    : "/images/flame.png"
                }
                alt={gameTemperature === "Cold" ? "Snowflake" : "Flame"}
                className={clsx("absolute", {
                  "md:w-[57px] w-[40px] h-auto": gameTemperature === "Hot",
                  "md:w-[43px] w-[28px] h-auto": gameTemperature === "Cold",
                })}
                style={{
                  left: `${flakePos.x}px`,
                  top: `${flakePos.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}

            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/images/slot-logo.png"
                alt="Creator logo"
                className="rounded-full"
                width={isMobile ? 92 : 128}
                height={isMobile ? 92 : 128}
              />
            </div>
          </div>

          <div className="text-[20px] md:text-[40px] font-[Montserrat] font-black md:mb-[-8]">
            {srp.toFixed(1)}%
          </div>
          <div className="text-xs md:text-base font-semibold vertical-align-middle">
            <Image
              src={
                gameTemperature === "Cold"
                  ? "/images/ice-emoji.png"
                  : "/images/hot-emoji.png"
              }
              alt={gameTemperature === "Cold" ? "Ice emoji" : "Hot emoji"}
              className="inline-block mr-1 mt-[-2]"
              width={16}
              height={16}
            />
            <span
              className={clsx("", {
                "text-[#36FCF0]": gameTemperature === "Cold",
                "text-[#EF240B]": gameTemperature === "Hot",
              })}>
              RTP {parseFloat(rtpState) > 0 ? `+${rtpState}` : rtpState}%
            </span>
          </div>
        </div>

        {!isMobile && (
          <>
            <div className="bg-[#0B1B32] p-5 rounded-lg mb-4 ">
              <div className="flex justify-between font-semibold">
                <span>
                  SRP
                  <svg
                    className="inline-block ml-1 mt-[-3] text-[#607E9D]"
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 0C4.0374 0 0 4.03745 0 9.00006C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00006C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00006C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00006C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8.99981 3.81824C8.39839 3.81824 7.90912 4.30784 7.90912 4.90964C7.90912 5.51089 8.39839 6.00006 8.99981 6.00006C9.60123 6.00006 10.0905 5.51089 10.0905 4.90964C10.0905 4.30784 9.60123 3.81824 8.99981 3.81824Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9.00001 7.63635C8.54815 7.63635 8.18182 8.00268 8.18182 8.45453V13.3636C8.18182 13.8155 8.54815 14.1818 9.00001 14.1818C9.45186 14.1818 9.81819 13.8155 9.81819 13.3636V8.45453C9.81819 8.00268 9.45186 7.63635 9.00001 7.63635Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>{srp.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Game RTP</span>
                <span>{gameRtp.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Difference</span>
                <span>
                  {parseFloat(rtpState) > 0 ? `+${rtpState}` : rtpState}%
                </span>
              </div>
              <div className="w-[100%] h-[2px] bg-white opacity-10 mt-2 mb-3"></div>
              <div className="text-xs text-center text-[#36FCF0]">
                <svg
                  className="inline-block mr-1 mt-[-2]"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.00318 0.800049C4.03554 0.800049 0.799988 4.03561 0.799988 8.00324C0.799988 11.9709 4.03554 15.2 8.00318 15.2C11.9708 15.2 15.2 11.9709 15.2 8.00324C15.2005 7.91677 15.1839 7.83106 15.151 7.75105C15.1182 7.67105 15.0699 7.59835 15.0088 7.53714C14.9477 7.47594 14.8751 7.42745 14.7951 7.39447C14.7152 7.3615 14.6295 7.3447 14.5431 7.34504C14.457 7.34537 14.3719 7.36267 14.2925 7.39595C14.2132 7.42922 14.1412 7.47782 14.0806 7.53896C14.0201 7.60009 13.9722 7.67257 13.9397 7.75224C13.9072 7.83191 13.8907 7.9172 13.8912 8.00324C13.8912 11.2636 11.2635 13.8913 8.00318 13.8913C4.74284 13.8913 2.10873 11.2636 2.10873 8.00324C2.10873 4.7429 4.74284 2.10879 8.00318 2.10879C8.17585 2.10812 8.34125 2.03923 8.46334 1.91714C8.58543 1.79504 8.65432 1.62964 8.655 1.45698C8.65533 1.37104 8.63874 1.28588 8.60616 1.20636C8.57359 1.12684 8.52567 1.05452 8.46514 0.993516C8.40462 0.932514 8.33267 0.884032 8.2534 0.850837C8.17414 0.817642 8.08911 0.800384 8.00318 0.800049ZM10.4865 1.2921C10.231 1.29458 9.98981 1.44713 9.88705 1.69853C9.74912 2.03334 9.90832 2.41656 10.2436 2.55356C10.2513 2.55677 10.2562 2.56098 10.2627 2.5637C10.5975 2.70541 10.9839 2.54688 11.1228 2.21095C11.2613 1.87748 11.1033 1.49482 10.7701 1.35592C10.7607 1.35197 10.7503 1.34529 10.742 1.34183C10.6583 1.30735 10.5716 1.29124 10.4865 1.2921ZM12.6157 2.7082C12.4433 2.70963 12.2784 2.77884 12.1569 2.90119C11.9 3.15697 11.9 3.57329 12.1569 3.82907C12.1623 3.83451 12.1656 3.83772 12.171 3.84316C12.4254 4.10141 12.8418 4.10386 13.0989 3.84836C13.3558 3.59258 13.3558 3.17626 13.0989 2.92048C13.0922 2.9138 13.0865 2.90787 13.0798 2.90144C12.9571 2.7779 12.7899 2.70835 12.6157 2.7082ZM8.00318 3.41881C7.91671 3.4183 7.831 3.43494 7.75099 3.46776C7.67099 3.50058 7.59829 3.54892 7.53708 3.61001C7.47588 3.6711 7.42739 3.74371 7.39441 3.82365C7.36144 3.90358 7.34464 3.98927 7.34498 4.07574V8.00324C7.34532 8.12469 7.37946 8.24365 7.44356 8.3468C7.50767 8.44995 7.59921 8.53323 7.70795 8.58732L10.3254 9.89606C10.4024 9.93466 10.4863 9.95768 10.5722 9.96379C10.6582 9.9699 10.7444 9.95899 10.8261 9.93167C10.9078 9.90436 10.9833 9.86119 11.0483 9.80464C11.1133 9.74808 11.1664 9.67926 11.2047 9.60211C11.2433 9.5251 11.2664 9.44123 11.2725 9.35531C11.2786 9.26939 11.2677 9.1831 11.2404 9.10141C11.213 9.01971 11.1699 8.94422 11.1133 8.87924C11.0568 8.81427 10.9879 8.76111 10.9108 8.72279L8.655 7.59682V4.07574C8.65533 3.9898 8.63874 3.90465 8.60616 3.82513C8.57359 3.7456 8.52567 3.67328 8.46514 3.61228C8.40462 3.55128 8.33267 3.50279 8.2534 3.4696C8.17414 3.4364 8.08911 3.41915 8.00318 3.41881ZM14.0459 4.82596C13.9602 4.82547 13.873 4.84179 13.789 4.87709C13.453 5.01598 13.2945 5.40242 13.4362 5.73723C13.4395 5.74514 13.4437 5.74959 13.4464 5.75627C13.5834 6.09146 13.9666 6.25206 14.3014 6.11413C14.6366 5.97714 14.7972 5.59391 14.6593 5.2591C14.6556 5.2502 14.6524 5.24278 14.6491 5.23486C14.5464 4.98147 14.3029 4.82745 14.0459 4.82596Z"
                    fill="currentColor"
                  />
                </svg>

                <span>Last Update: 2 min ago based on 6990 Spins</span>
              </div>
            </div>
            <button className="text-white font-bold w-full">
              <span className="before"></span>
              <span className="bg-[#3736FA] hover:bg-[#6665e8] block rounded-full py-3 px-4 relative">
                Play Now at Ice Casino
              </span>
            </button>
          </>
        )}
      </div>

      {isMobile && (
        <div className="flex justify-between items-center font-inter text-sm pt-[12px] pb-[20px] px-3">
          <div>
            <p className="font-bold">gamename</p>
            <p className="text-[13px] text-[#607E9D]">by Netent</p>
          </div>
          <button className="bg-[#021024] rounded-full p-2 text-[#36FCF0]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 0C4.0374 0 0 4.03745 0 9.00006C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00006C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00006C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00006C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                fill="currentColor"
              />
              <path
                d="M8.99981 3.81824C8.39839 3.81824 7.90912 4.30784 7.90912 4.90964C7.90912 5.51089 8.39839 6.00006 8.99981 6.00006C9.60123 6.00006 10.0905 5.51089 10.0905 4.90964C10.0905 4.30784 9.60123 3.81824 8.99981 3.81824Z"
                fill="currentColor"
              />
              <path
                d="M9.00001 7.63635C8.54815 7.63635 8.18182 8.00268 8.18182 8.45453V13.3636C8.18182 13.8155 8.54815 14.1818 9.00001 14.1818C9.45186 14.1818 9.81819 13.8155 9.81819 13.3636V8.45453C9.81819 8.00268 9.45186 7.63635 9.00001 7.63635Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FancyBox;
