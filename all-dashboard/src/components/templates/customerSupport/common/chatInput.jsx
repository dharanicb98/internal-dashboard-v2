import React from "react";
import AttachmentIcon from "assets/icons/attachment.svg";
import SendIcon from "assets/icons/send.png";
import Image from "next/image";

function ChatInput({
  sendMessage,
  handleAttachmentClick,
  isLoading,
  setMessage,
  message,
}) {

  const fileInputRef = React.useRef(null);

  return (
    <div className="flex px-9 py-4 border-[#D9D9D9] border rounded-full gap bg-white mt-[1px]">
      <input
        type="file"
        // onChange={handleChangeFile}
        // ref={fileInputRef}

        // ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div className="flex gap-[26px] md:gap-5 shrink-0">
        <button onClick={handleAttachmentClick} className="shrink-0">
          <Image
            src={AttachmentIcon}
            width={24}
            height={24}
            className="md:w-[18px] md:h-[18px]"
            alt="attachment"
          />
        </button>
      </div>
      <input
        className="mx-3 placeholder-grey-dark pl-2 !outline-none flex-1 md:mx-2 md:pl-0 w-full"
        placeholder="Type something here"
        value={message}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
        onChange={(event) => setMessage(event.target.value)}
      />
      {isLoading ? (
        <div className="h-5 w-5 shrink">Loading...</div>
      ) : (
        <button onClick={sendMessage} type="submit" className="shrink-0">
          <Image
            src={SendIcon}
            width={24}
            height={24}
            alt="attachment"
            className="ml-auto md:w-5 md:h-5"
          />
        </button>
      )}
    </div>
  );
}

export default ChatInput;
