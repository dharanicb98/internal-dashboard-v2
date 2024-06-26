import React, { useState } from "react";
import HelpImage from "assets/images/help-card-icon-payment.png";
import Divider from "ui/divider";
import Image from "next/image";

const data = [
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
  {
    title: "How will you get Paid",
    description: "Guidelines to safeguard your account and money",
  },
];

const HelpCard = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? data : data.slice(0, 2);

  return (
    <div className="border border-solid w-[380px] border-[#D9D9D9] rounded-[10px]">
      <div className="text-[20px] font-medium mb-4 p-6">
        Popular Help Topics
      </div>
      {displayedData.map((item, index) => (
        <div key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-normal mb-2">{item.title}</div>
            <div>
              <Image src={HelpImage} alt="help-image" />
            </div>
          </div>
          <div className="w-3/5">
            <p className="text-[#6b6b6b] text-[14px] font-normal mb-[14px]">
              {item.description}
            </p>
            <button className="underline text-sm font-normal mb-5">
              Learn More
            </button>
          </div>
          {/* <Divider className="mb-[29px]" /> */}
          {index !== displayedData.length - 1 && (
            <Divider className="mb-[29px]" />
          )}
        </div>
      ))}
      <Divider className="w-full" />
      <button
        onClick={() => setShowAll((prev) => !prev)}
        className="flex mx-auto"
      >
        View all
      </button>
    </div>
  );
};

export default HelpCard;
