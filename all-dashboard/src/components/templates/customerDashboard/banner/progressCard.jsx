import React from "react";
import Close from "assets/icons/close.svg";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { black } from "tailwindcss/colors";
import { useRouter } from "next/router";

const ProgressCard = ({ description, onRemove }) => {
  const router = useRouter();

  // const description = "Lets fix 20 more work and complete your profile.  ";
  return (
    <div
      className="min-w-[380px] p-4 rounded-lg flex gap-4"
      style={{
        background:
          "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.77) 100%)",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="w-[18px] h-[18px]">
        <button onClick={onRemove}>
          {/* <Image src={Close} alt="close-icon" /> */}
          &#10006;
        </button>
      </div>
      <div className="flex flex-col">
        <div className="font-medium text-sm">Profile Progress</div>
        <div className="text-sm font-normal flex mt-1.5">
          <div>
            {description}
            <button
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/profile`)}
              className="text-sm font-normal"
            >
              <b>(Tap Here)</b>
            </button>
          </div>
        </div>
      </div>
      <div className="w-24 mt-auto">
        <CircularProgressbar
          className="w-full h-full"
          value={80}
          text={`80%`}
          styles={buildStyles({
            pathColor: "black",
            textColor: "black",
          })}
        />
      </div>
    </div>
  );
};

export default ProgressCard;