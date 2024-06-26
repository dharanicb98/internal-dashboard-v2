import React from "react";
import Close from "assets/icons/close.svg";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { black } from "tailwindcss/colors";
import { useRouter } from "next/router";

const ProgressCardMobile = () => {
  const router = useRouter();

  return (
    <div
      className="px-6 py-3.5 flex justify-between gap-[45px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0.35) 100%)",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
        // backdropFilter: "blur(2px)",
      }}
    >
      <div className="flex flex-col">
        <div className="text-white font-medium text-sm">Profile Progress</div>
        <div className="text-sm font-normal flex">
          <div className="text-white text-sm font-normal">
            Lets fix 20 more work and complete your profile
            <button
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/profile`)}
              className="text-white text-sm font-normal"
            >
              (Tap Here)
            </button>
          </div>
        </div>
      </div>
      <div className="w-[58px] h-[56px] mt-auto">
        <CircularProgressbar
          value={80}
          text={`80%`}
          styles={buildStyles({
            pathColor: "white",
            textColor: "white",
            trailColor: "#565454",
          })}
        />
      </div>
    </div>
  );
};

export default ProgressCardMobile;
