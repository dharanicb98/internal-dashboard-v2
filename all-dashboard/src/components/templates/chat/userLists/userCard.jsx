import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import {
  updateChatId,
  updateIsBlocked,
  setSocketEvents,
  toggleChatListLoading,
  updateMessageList,
  updateCurrentChat,
} from "slices/chat";
import Logo from "assets/images/logo-ico.svg";
import { useDispatch } from "react-redux";
import getMessageList from "services/chat/getMessageList";
import { useUserDetailsSelector } from "store/selectors/user";
import {
  useChatIdSelector,
  useChatUserListFilterSelector,
} from "store/selectors/chat";

export default function UserCard(props) {
  const {
    user,
    host,
    lastMessage,
    _id: chatId,
    requestType,
    type,
    unreadCount,
    latestOpenOrder = {},
  } = props;
  const dispatch = useDispatch();
  const userDetails = useUserDetailsSelector();
  const useChatId = useChatIdSelector();
  const filter = useChatUserListFilterSelector();

  const listUserData =
    type === "support"
      ? {
          name: "HolidayKeepers Support",
        }
      : userDetails?.isHost
      ? user
      : host;

  const handleChangeChatData = async () => {
    if (useChatId != chatId) {
      dispatch(toggleChatListLoading(true));
      const { data, isBlocked } = await getMessageList(chatId);
      dispatch(updateChatId(chatId));
      dispatch(
        updateCurrentChat({
          ...props,
          currentUser: userDetails?.isHost ? user : host,
          otherUser: userDetails?.isHost ? user : host,
          chatId,
        })
      );
      dispatch(updateMessageList(data));
      dispatch(updateIsBlocked(isBlocked));
      dispatch(toggleChatListLoading(false));

      dispatch(setSocketEvents({ name: "reload_chat" }));
    }
  };

  const tagsTitle = {
    booking_request: "Booking Request",
    bid_request: "Bid Request",
  };

  const getBGColor = () => {
    if (type === "booking_request") {
      return "bg-orange-light";
    } else if (type === "bid_request") {
      return "bg-yellow-light";
    }
    return "bg-white";
  };

  const getSelectedColor = () => {
    if (props?._id && useChatId == props?._id) return "!bg-green-50";
    return "";
  };

  const getCount = () => {
    return userDetails?.userId == props?.lastMessage?.senderId
      ? ""
      : unreadCount
      ? `(${unreadCount})`
      : "";
  };

  const isFilters = () => {
    if (
      filter.includes("read_messages") &&
      !filter.includes("unread_messages") &&
      getCount()
    )
      return true;
    if (
      filter.includes("unread_messages") &&
      !filter.includes("read_messages") &&
      !getCount()
    )
      return true;
    return false;
  };

  return isFilters() ? undefined : (
    <div
      className={`p-4 cursor-pointer last:mb-6 flex items-center gap-3 ${getBGColor()} ${getSelectedColor()} `}
      onClick={handleChangeChatData}
    >
      <div className="w-20 h-20 shrink-0 relative">
        {type === "support" ? (
          <div className="h-20 w-20 flex-center border border-grey rounded-full">
            <Image src={Logo} alt="logo" height={42} width={38} />
          </div>
        ) : (
          <>
            <Image
              src={userDetails?.isHost ? host.image : user.image}
              width={60}
              height={60}
              alt=""
              className="overflow-hidden bg-green-50 rounded-full bg-center h-[60px] w-[60px] object-cover absolute right-0"
            />
            <Image
              src={userDetails?.isHost ? user.image : host.image}
              width={60}
              height={60}
              alt=""
              className="overflow-hidden bg-grey-100 rounded-full bg-center h-[60px] w-[60px] object-cover absolute bottom-0 border-2 border-white"
            />
          </>
        )}
      </div>
      <div>
        <div className="flex items-start flex-col">
          {userDetails?.isHost ? (
            <p className="capitalize text-[12px]">{requestType}</p>
          ) : (
            ""
          )}
          <p className="font-[600]">
            {listUserData.name} {getCount()}
          </p>
          {!!tagsTitle[type] && (
            <>
              <div className="colored-circle h-0.5 w-0.5 bg-grey-dark my-auto mx-1" />
              <p className="text-primary text-sm">{tagsTitle[type]}</p>
            </>
          )}
        </div>
        <p className="line-clamp-2 my-0.5">
          {type === "support"
            ? "Can you describe your issue in few sentences? this will help our team......"
            : latestOpenOrder?.propertyName || ""}
        </p>
        {type !== "support" && (
          <p className="text-grey-dark">
            {<TimeStamp lastMessage={lastMessage} />}
          </p>
        )}
      </div>
    </div>
  );
}

const TimeStamp = ({ lastMessage }) => {
  // const [show, setShow] = useState(false);
  // useEffect(() => {
  //   let timer1 = setTimeout(() => setShow(!show), 5000);
  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // }, [show]);

  return lastMessage?.timestamp
    ? // ? moment(lastMessage?.timestamp).fromNow()
      moment(lastMessage?.timestamp).format("ll")
    : "";
};
