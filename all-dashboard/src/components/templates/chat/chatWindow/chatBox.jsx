import Image from "next/image";
import moment from "moment";
import React from "react";
import ChatView from "./chatView";
import { useUserSelector } from "src/store/selectors/user";
import {
  useChatUserListSelector,
  useChatIdSelector,
  useCurrentChatSelector,
} from "store/selectors/chat";
import TickIcon from "assets/icons/tick.svg";
import DeliveredIcon from "assets/icons/delivered.svg";
import { useUserDetailsSelector } from "store/selectors/user";
import AvatarIcon from "assets/images/avatar.svg";

export default function ChatBox(props) {
  const { timestamp, senderId, messageStatus } = props;
  const userDetails = useUserDetailsSelector();

  const currentChat = useCurrentChatSelector();

  const isUserMessage = senderId == userDetails.userId;

  const status = {
    Read: <Image src={DeliveredIcon} alt="read" width={12} height={7} />,
    Sent: <Image src={TickIcon} alt="sent" width={12} height={7} />,
  };

  
  return (
  
    <div className={`${  isUserMessage ? "self-end" : "self-start"}  max-w-[70%] md:max-w-full `}>
      <div
        className={`flex gap-4 items-center ${   isUserMessage ? "flex-row-reverse" : "" }`}>
        <Image  width={44}  height={44}
          //for now later change with apis with real image url
          src={ !userDetails.isHost
              ? isUserMessage ? currentChat?.user?.image || AvatarIcon:  currentChat?.host?.image
              : isUserMessage ? currentChat?.host?.image || AvatarIcon:  currentChat?.user?.image
          }
        //   src={ !userDetails.isHost
        //     ? isUserMessage ? AvatarIcon : AvatarIcon
        //     : isUserMessage ? AvatarIcon :  AvatarIcon
        // }
          className="bg-grey-100 w-11 h-11 rounded-full object-cover min-w-[44px]"
          alt=""
        />
        <ChatView {...props}  />
      </div>

      <div className={`flex items-center mt-4 bg-red-400 md-m:hidden ${isUserMessage ? "justify-end" : "justify-start ml-[60px]"}`}>
        <p className={`mr-[5px] text-[10px] whitespace-nowrap `}>
          {moment(timestamp).format("LT")}
        </p>
        {isUserMessage && status[messageStatus]}
      </div>
    </div>
  );
}
