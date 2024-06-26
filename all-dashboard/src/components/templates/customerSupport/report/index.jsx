import React, { useState } from "react";
import NeedHelpCard from "../common/needHelpCard";
import ChatInput from "../common/chatInput";
import Textarea from "ui/input/textarea";

const rating = [1, 2, 3, 4, 5];

function BugReport() {
  const [ratingSelected, setRatingSelected] = useState(-1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const fileInputRef = React.useRef(null);

  const sendMessage = () => {};

  const handleAttachmentClick = () => {};

  const handleRating = (rating) => {
    if (ratingSelected == rating) {
      setRatingSelected(-1);
    } else {
      setRatingSelected(rating);
    }
  };
  return (
    <div className="flex gap-16 flex-col md-m:flex-row">
      <div className="w-2/3 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <p className="text-lg">
            Please share us the experience or anythings that we can improvise.
          </p>
          <Textarea
            className={"rounded-xl h-[297px] p-5 border-[#5C5C5C]"}
            value={""}
            onChange={() => {}}
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting of the printing and typesetting industry."
          />
        </div>

        <div className="flex flex-col gap-6">
          <p className="">How much do you rate us</p>
          <div className="flex gap-12 md-b:gap-4 justify-between items-center">
            <span className="text-sm text-[#000000B2]">Not Happy</span>
            <div className="flex gap-9 md-b:gap-4 justify-center flex-1">
              {rating.map((rate) => (
                <div
                  className={`grid place-items-center h-[46px] w-[46px] md-b:h-[36px] md-b:w-[36px]  border border-[#5C5C5C] rounded-full cursor-pointer ${
                    ratingSelected == rate && "bg-black text-white"
                  }`}
                  onClick={() => handleRating(rate)}
                >
                  <span>{rate}</span>
                </div>
              ))}
            </div>

            <span className="text-sm text-[#000000B2]">Extremly Happy</span>
          </div>
          <div className="mt-3">
            <ChatInput
              sendMessage={sendMessage}
              handleAttachmentClick={handleAttachmentClick}
              isLoading={isLoading}
              setMessage={setMessage}
              message={message}
            />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <NeedHelpCard cardClassname="bg-[#FFF7E2] border-0" />
      </div>
    </div>
  );
}

export default BugReport;
