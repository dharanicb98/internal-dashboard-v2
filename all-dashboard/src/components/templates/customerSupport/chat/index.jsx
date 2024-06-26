import React, { useState } from "react";
import NeedHelpCard from "../common/needHelpCard";
import ChatInput from "../common/chatInput";
import Textarea from "ui/input/textarea";

function ChatWithUs() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
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
            If you need help from Holidaykeepers, select the issue you’re
            experiencing.
          </p>
          <div
            className={"rounded-xl h-[297px] p-5 border border-[#5C5C5C]"}
          ></div>
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
      <div className="flex-1">
        <NeedHelpCard />
      </div>
    </div>
  );
}

export default ChatWithUs;
