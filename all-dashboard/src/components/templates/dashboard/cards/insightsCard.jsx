import React from "react";
import Image from "next/image";
import QuestionIcon from "assets/images/questionicon.png";
import CloseIcon from "assets/icons/close-round-black.svg";
import GreenTick from "assets/images/greentick.png";

const InsightsCard = ({ isAchieved, percentage, title, description,text }) => {
  return (
    <div
      className="flex flex-col justify-between items-start relative border min-w-[180px] min-h-[270px] px-8 py-4 rounded-2xl"
      style={{
        boxShadow: `0px 4px 20px 0px rgba(0, 0, 0, 0.10)`,
      }}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <div className="text-[24px] font-semibold">
            {percentage || "2.5%"}
          </div>
          <div>
            <Image src={QuestionIcon} alt="question-icon" />
          </div>
        </div>
        <div className="gap-4 text-base font-medium">
          {title || "Overall ratings"}
        </div>
        <div className="text-grey-dark">
          Criteria : {description || "Lorem"}
        </div>
      </div>

      {!isAchieved ? (
        <div className="flex absolute bottom-4 left-8 gap-3">
          <Image src={CloseIcon} alt="close-icon" />
          <div className="text-grey-dark">Didn't Meet</div>
        </div>
      ) : (
        <div className="flex absolute bottom-4 left-8 gap-3">
          <Image src={GreenTick} alt="green-tick-icon" />
          <div className="text-grey-dark">Achieved</div>
        </div>
      )}
    </div>
  );
};

export default InsightsCard;
