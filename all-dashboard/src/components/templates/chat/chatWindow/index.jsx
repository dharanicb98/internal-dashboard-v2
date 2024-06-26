import Image from "next/image";
import MenuIcon from "assets/icons/menu.svg";
import React, { useState } from "react";
import Loading from "ui/loading";
import ChatListContainer from "./chatList";
import Textarea from "ui/input/textarea";
import {
  useChatListLoadingSelector,
  useCurrentChatSelector,
  useChatIsBlockedSelector,
} from "selectors/chat";
import Select from "ui/input/select";
import Popover from "ui/popover";
import { ChatInput } from "./chatInput";
import {
  updateChatId,
  updateMessageStatusToRead,
  pushNewMessage,
} from "slices/chat";
// import { updateChatId, updateMessageList } from "slices/chat";
import ChevronLeft from "assets/icons/chevron-left.svg";
import { useDispatch } from "react-redux";
import reportConversation from "services/chat/reportConversation";
import blockConversation from "services/chat/blockConversation";
import {
  disconnectListener,
  listenMessages,
  listenMessageStatus,
  removeChatWindowListener,
} from "utils/socket/listeners";
import { updateMessageStatus, updateOnlineStatus } from "utils/socket/emitters";
import { useUserDetailsSelector } from "store/selectors/user";

export default function ChatWindow() {
  const [popupBlock, setPopupBlock] = useState("");
  const [comment, setComment] = useState("");
  const isChatLoading = useChatListLoadingSelector();
  const dispatch = useDispatch();
  const userDetails = useUserDetailsSelector();
  const currentChat = useCurrentChatSelector();
  const isBlocked = useChatIsBlockedSelector();

  const isOnline = !userDetails?.isHost ? currentChat?.host.isOnline : currentChat?.user.isOnline;

  const updateChatMessage = (message) => {
    new Audio("/assets/music/chat.mp3")?.play();
    dispatch(pushNewMessage(message));
    if (message.senderId !== userDetails.userId) {
      updateMessageStatus({
        conversationId: currentChat._id,
        senderId: userDetails.userId,
      });
    }
  };
  const listenMessageStatusCallback = (data) => {
    console.log(data, userDetails.userId, "status callback");
    if (
      currentChat._id == data.conversationId &&
      userDetails.userId !== data.senderId
    ) {
      dispatch(updateMessageStatusToRead());
    }
  };
  // const messageList = useMessageListSelector();
  // const updateChatMessage = (message) => {
  //   console.log(message, "chat message");
  //   dispatch(updateMessageList([...messageList, message]));
  // };

  // const listenMessageStatusCallback = (updateId) => {
  //   if (currentChat._id === updateId) {
  //     const mappedUpdatedStatus = messageList.map((item) => ({
  //       ...item,
  //       messageStatus: "Read",
  //     }));
  //     dispatch(updateMessageList(mappedUpdatedStatus));
  //   }
  // };

  React.useEffect(() => {
    if (!isChatLoading) {
      listenMessageStatus(listenMessageStatusCallback);
      updateMessageStatus({
        conversationId: currentChat._id,
        senderId: userDetails.userId,
      });
      listenMessages(currentChat._id, updateChatMessage);
      updateOnlineStatus(userDetails.isHost, {
        id: userDetails.userId,
        isOnline: false,
      });
    }
    return () => {
      disconnectListener(currentChat._id);
      updateOnlineStatus(userDetails.isHost, {
        id: userDetails.userId,
        isOnline: false,
      });
      removeChatWindowListener();
    };
  }, [isChatLoading]);

  const handleBlock = async (value) => {
    setPopupBlock(value);
  };

  const handleBlockPopup = async (value) => {
    if (value === "report") {
      await reportConversation({
        conversationId: currentChat?.chatId,
        userId: userDetails.userId,
        comment: comment,
      });
    } else {
      await blockConversation({
        conversationId: currentChat?.chatId,
        userId: userDetails.userId,
        comment: comment,
      });
    }
    dispatch(updateChatId(""));
  };

  return (
    <div className="m-auto flex flex-col h-full md:py-10 md:px-6">
      <div className="flex relative justify-between items-center pb-7 border-b border-b-grey h-[72px] md:hidden">
        <div className="flex gap-3">
          <div className="relative">
            <Image
              width={44}
              height={44}
              src={currentChat?.otherUser?.image}
              className="bg-green-50 w-11 h-11 rounded-full object-cover"
              alt=""
            />
            {!!isOnline && (
              <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green border-2 border-white dark:border-gray-800 rounded-full" />
            )}
          </div>
          <div>
            <p className="font-[600] text-[16px]">
              {currentChat?.otherUser?.name}
            </p>
            <p className="text-xs text-grey-dark font-[300] ">
              {isOnline ? "Active now" : "Away"}
            </p>
          </div>
        </div>

        {isBlocked ? (
          ""
        ) : (
          <Select
            buttonContent={
              <button className="w-[3px] h-[15px]">
                <Image src={MenuIcon} width={3} height={15} alt="menu" />
              </button>
            }
            options={[
              { key: "Report User", value: "report" },
              { key: "Block User", value: "block" },
            ]}
            onChange={handleBlock}
            listPaperClass="shadow-2xl right-full whitespace-nowrap text-xs"
          />
        )}
        <Popover
          openDialog={!!popupBlock}
          setOpenDialog={setPopupBlock}
          containerClass="right-0 top-[40px]"
        >
          <div className="p-4 bg-white rounded-2xl shadow-lg w-[363px]">
            <p className="text-xl font-medium mb-5 capitalize">
              {popupBlock} User
            </p>

            <div className="relative">
              <Textarea
                className={"rounded-xl h-[82px] !border-grey"}
                placeholder="Comment"
                value={comment}
                onChange={(value) => setComment(value)}
              />
            </div>

            <button
              onClick={() => handleBlockPopup(popupBlock)}
              type="button"
              className="px-2"
            >
              Save
            </button>
          </div>
        </Popover>
      </div>
      <div className="hidden md:flex items-center gap-4 pb-[34px] border-b border-b-grey">
        <Image
          src={ChevronLeft}
          alt="back"
          onClick={() => {
            dispatch(updateChatId(""));
          }}
        />
        <p>{currentChat?.currentUser?.name}</p>
        <Select
          buttonContent={
            <button className="w-[3px] h-[15px]">
              <Image src={MenuIcon} width={3} height={15} alt="menu" />
            </button>
          }
          options={[
            { key: "Report User", value: "report" },
            { key: "Block User", value: "block" },
          ]}
          onChange={(value) => console.log(value)}
          listPaperClass="shadow-2xl right-full whitespace-nowrap text-xs"
          containerClass="ml-auto"
        />
      </div>

      {isChatLoading ? (
        <div className="mx-auto w-fit mt-8">
          <Loading />
        </div>
      ) : (
        <>
          <ChatListContainer />
          <ChatInput />
        </>
      )}
    </div>
  );
}
