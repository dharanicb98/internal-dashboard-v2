import React from "react";
import Image from "next/image";
import HomeIcon from "assets/icons/homeIconMobile.png";
import InsightsIcon from "assets/icons/InsightsMobile.png";
import CalendarIcon from "assets/icons/CalendarIconMobile.png";
import EmailIcon from "assets/icons/EmailIconMobile.png";
import { useRouter } from "next/router";

const MobileAppBarBottom = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black flex justify-around py-2 dialog__index hidden md:flex">
      <button
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/chat`)}
        className="flex flex-col items-center"
      >
        <Image src={EmailIcon} alt="EmailIcon" />
        <div className="text-white no-underline">Message</div>
      </button>

      <button
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/insights`)}
        className="flex flex-col items-center"
      >
        <Image src={InsightsIcon} alt="InsightsIcon" />
        <div className="text-white no-underline">Insights</div>
      </button>
      <button
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/calendar`)}
        className="flex flex-col items-center"
      >
        <Image src={CalendarIcon} alt="InsightsIcon" />
        <div className="text-white no-underline">Calendar</div>
      </button>
      <button
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/`)}
        className="flex flex-col items-center"
      >
        <Image src={HomeIcon} alt="homeIcon" />
        <div className="text-white no-underline">Home</div>
      </button>
    </div>
  );
};

export default MobileAppBarBottom;
