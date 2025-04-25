import React from "react";
import Image from "next/image";

type FancyBoxProps = {
  srp: string;
  gameRtp: string;
  difference: string;
  lastUpdate: string;
  spins: number;
};

const FancyBox: React.FC<FancyBoxProps> = ({
  srp,
  gameRtp,
  difference,
  lastUpdate,
  spins,
}) => {
  return (
    <div className="box bg-[#021024] text-white rounded-4xl max-w-sm mx-auto">
      <div className="box-head flex justify-between items-center p-4">
        <div className="text-sm">
          <Image
            src="/images/casino-logo.png"
            alt="Casino logo"
            className="rounded-full"
            width={32}
            height={32}
          />
          <span>Casino</span>
          <span>BlueChip</span>
        </div>
        <div className="text-sm">
          <Image
            src="/images/user-logo.png"
            alt="Creator logo"
            className="rounded-full"
            width={32}
            height={32}
          />
          <span>Created by</span>
          <span>Netent</span>
        </div>
      </div>

      <div className="box-body p-7">
        <div className="text-center mb-4">
          <div className="relative size-40">
            <svg
              className="rotate-[135deg] size-full"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-purple-200 dark:text-neutral-700"
                strokeWidth="1"
                strokeDasharray="75 100"></circle>

              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-purple-600 dark:text-purple-500"
                strokeWidth="2"
                strokeDasharray="18.75 100"></circle>
            </svg>

            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-4xl font-bold text-purple-600 dark:text-purple-500">
                25
              </span>
              <span className="text-purple-600 dark:text-purple-500 block">
                mph
              </span>
            </div>
          </div>
          <Image
            src="/images/slot-logo.png"
            alt="Creator logo"
            className="rounded-full"
            width={100}
            height={100}
          />
          <div className="text-4xl font-bold">88.2%</div>
          <div className="text-lg">RTP -6.80%</div>
        </div>

        <div className="bg-blue-800 p-4 rounded-lg mb-4">
          <div className="flex justify-between text-sm">
            <span>SRP</span>
            <span>{srp}88.2%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Game RTP</span>
            <span>{gameRtp}95.0%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Difference</span>
            <span>{difference}🧊🧊🧊🧊 -6.80%</span>
          </div>
        </div>

        <div className="text-xs text-center mb-4">
          Last Update: 2 min ago based on 6990 Spins {lastUpdate} {spins}
        </div>

        <button className="bg-[#3736FA] text-white py-2 px-4 rounded-lg w-full">
          Play Now at Ice Casino
        </button>
      </div>
    </div>
  );
};

export default FancyBox;
