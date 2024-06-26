import Image from "next/image";
import AttachmentIcon from "assets/icons/attachment.svg";
import BookmarkIcon from "assets/icons/bookmark.svg";
import ScheduleIcon from "assets/icons/schedule.svg";
import SendIcon from "assets/icons/send.png";
import React, { useEffect } from "react";
import { emitMessage } from "utils/socket/emitters";
import socket from "utils/socket/listeners";
import { getFileType } from "services/uploadFile";
import Loading from "ui/loading";
import Dialog from "ui/dialog";
import ScheduleDialog from "./scheduleDialog";
import { toggleSavedMessageDlgVisibility } from "store/slices/chat";
import { useDispatch } from "react-redux";
import { updateUserList } from "slices/chat";
import {
  useChatIdSelector,
  useChatUserListSelector,
  useChatIsBlockedSelector,
  useSavedMessageDlgSelector,
} from "store/selectors/chat";
import { useUserDetailsSelector } from "store/selectors/user";
import uploadAttachment from "services/chat/uploadAttachments";

export function ChatInput() {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const fileInputRef = React.useRef(null);
  const [scheduleDialogTarget, setScheduleTarget] = React.useState(null);
  const userDetails = useUserDetailsSelector();

  const showSavedMessages = useSavedMessageDlgSelector();
  const chatId = useChatIdSelector();
  const userListAry = useChatUserListSelector();
  const isBlocked = useChatIsBlockedSelector();

  useEffect(() => {
    socket.on("disconnect", () => {
      setIsLoading(true);
    });
    socket.on("connect", () => {
      setIsLoading(false);
    });
  }, [socket]);

  const sendMessage = () => {
    if (message && String(message).trim()) {
      emitMessage({
        senderId: userDetails.userId,
        content: message,
        contentType: "text",
        conversationId: chatId,
      });

      const currentObj = [...userListAry.filter((u) => u._id == chatId)];
      if (currentObj?.[0]?.lastMessage?.timestamp) {
        const newShadowObj = Object.assign({}, { ...currentObj[0] });
        const lastMessageObj = Object.assign(
          {},
          { ...newShadowObj.lastMessage }
        );
        lastMessageObj.timestamp = new Date().getTime();
        newShadowObj.lastMessage = lastMessageObj;
        currentObj[0] = newShadowObj;
      }
      const updatedUserList = [
        ...currentObj,
        ...userListAry.filter((u) => u._id != chatId),
      ];
      dispatch(updateUserList(updatedUserList || []));

      console.log("emit Message");
      setMessage("");
    }
  };

  const handleChangeFile = async (event) => {
    setIsLoading(true);
    const file = event.target.files?.[0] || {};
    const MAX_FILE_SIZE = 10240; // 10MB
    const fileSizeKiloBytes = file.size / 1024;
    if (fileSizeKiloBytes <= MAX_FILE_SIZE && file) {
      const fileType = getFileType(file.type);
      const fileName = file.name;
      const resp = await uploadAttachment(file);
      if (!resp.err) {
        emitMessage({
          senderId: userDetails.userId,
          content: "",
          contentUrl: resp.url,
          contentType: fileType,
          conversationId: chatId,
          fileName,
        });
      }
    }
    setIsLoading(false);
    console.error("Upload size limit exceeded");
  };

  const handleAttachmentClick = () => {
    fileInputRef?.current?.click();
  };

  return isBlocked ? (
    <p className="m-0 pt-4 text-center text-grey-500">This user has been blocked.</p>
  ) : (
    <div className="flex px-9 py-4 border-grey-dark border rounded-full gap bg-white mt-[1px]">
      <Dialog
        open={!!scheduleDialogTarget && userDetails.isHost}
        onClose={() => setScheduleTarget(null)}
      >
        <ScheduleDialog onClose={() => setScheduleTarget(null)} />
      </Dialog>
      <input
        type="file"
        onChange={handleChangeFile}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div className="flex gap-[26px] md:gap-5 shrink-0">
        <button onClick={handleAttachmentClick} className="shrink-0" disabled={isLoading}>
          <Image
            src={AttachmentIcon}
            width={24}
            height={24}
            className="md:w-[18px] md:h-[18px]"
            alt="attachment"
          />
        </button>
        <button
          className="shrink-0"
          disabled={isLoading}
          onClick={() => dispatch(toggleSavedMessageDlgVisibility(!showSavedMessages))}
        >
          <Image
            src={BookmarkIcon}
            width={24}
            height={24}
            className="md:w-[18px] md:h-[18px]"
            alt="bookmark"
          />
        </button>
        {userDetails.isHost && (
          <button
            className="shrink-0"
            disabled={isLoading}
            onClick={(event) => setScheduleTarget(event.currentTarget)}
          >
            <Image
              src={ScheduleIcon}
              width={24}
              height={24}
              className="md:w-[18px] md:h-[18px]"
              alt="schedule"
            />
          </button>
        )}
      </div>
      <input
        autoFocus
        className="mx-3 placeholder-grey-dark pl-2 !outline-none flex-1 md:mx-2 md:pl-0 w-full"
        placeholder="Type something here"
        value={message}
        onKeyDown={(event) => {
          if (!isLoading && event.key === "Enter") {
            sendMessage();
          }
        }}
        onChange={(event) => setMessage(event.target.value)}
      />
      {isLoading ? (
        <div className="h-5 w-5 shrink">
          <Loading />
        </div>
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
