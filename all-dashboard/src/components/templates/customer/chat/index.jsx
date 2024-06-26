import React, { useEffect } from "react";
import UserLists from "components/templates/chat/userLists";
import CommonLayout from '../../../layouts'
import ChatWindow from "components/templates/chat/chatWindow";
import EmptyImage from "assets/images/empty.jpg";
import Image from "next/image";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import Divider from "ui/divider";
import { useChatIdSelector } from "store/selectors/chat";
import {
  updateUserList,
  setSocketEvents,
  updateSavedMessageList,
  updateScheduleMessageList,
  updateScheduleMessageTemplates,
  updateUserListTotalCount,
} from "slices/chat";
import { updateUserDetails } from "slices/user";
import getConversationList from "src/services/chat/getConversationList";
import { wrapper } from "store/index";
import getSavedMessageList from "services/chat/getSavedMessageList";
import { useDispatch } from "react-redux";
import getScheduleMessageList from "services/chat/scheduleMessage/getScheduleMessageList";
import getScheduleMessageTemplates from "services/chat/scheduleMessage/getScheduleMessageTemplates";
import { initialSocketListeners } from "utils/socket/listeners";
import { useUserDetailsSelector } from "store/selectors/user";

import { validateServerAccessToken } from "utils/common";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await validateServerAccessToken(store, ctx);
    // const conversationList = await getConversationList({
    //   role: store.getState().user.details.isHost ? "host" : 'user',
    //   id: store.getState().user.details.userId,
    //   page: 1,
    // });
    // store.dispatch(updateUserList(conversationList?.list || []));
    // store.dispatch(updateUserListTotalCount(conversationList?.totalCount || 0));
    // return {
    //   props: {},
    // };
  }
);

export default function Chat() {
  const chatId = useChatIdSelector();
  const dispatch = useDispatch();
  const userDetails = useUserDetailsSelector();

  useEffect(() => {
    if (userDetails?.user_id) {
      (async function () {
        const conversationList = await getConversationList({
          role: userDetails.isHost ? "host" : "user",
          id: userDetails.userId,
          page: 1,
        });
        dispatch(updateUserList(conversationList?.list || []));
        dispatch(updateUserListTotalCount(conversationList?.totalCount || 0));
      })();
    }
  }, [userDetails]);

  const socketReceiver = (event) => {
    new Audio("/assets/music/chat.mp3")?.play();
    dispatch(setSocketEvents(event));
  };

  React.useEffect(() => {
    if(userDetails?.userId){
    (async () => {
      const [scheduleMessageList, savedMessageList, scheduleMessageTemplates] =
        await Promise.all([
          getScheduleMessageList(userDetails?.userId),
          getSavedMessageList(userDetails?.userId),
          getScheduleMessageTemplates(),
        ]);
      dispatch(updateScheduleMessageList(scheduleMessageList || []));
      dispatch(updateSavedMessageList(savedMessageList || []));
      dispatch(updateScheduleMessageTemplates(scheduleMessageTemplates || []));
      initialSocketListeners(userDetails, socketReceiver);
    })();
  }
  }, [userDetails]);

  return (
    <div className="mx-10 h-full flex flex-col max-h-screen overflow-hidden md:mx-0 ">
      <div className="relative">
        <DesktopAppBar
          path="customer-dashboard"
          title="Messages"
          containerClass="pt-10 shrink-0 md:hidden"
        />
      </div>

      <div className="flex justify-between mb-10 overflow-hidden h-full md:mb-0 md:w-full">
        <div
          className={`max-w-[444px] md:max-w-full md:w-full ${
            chatId ? "md:hidden" : "md:block"
          }`}
        >
          <UserLists />
        </div>
        <Divider orientation="vertical" className="mx-[14px] md:hidden" />
        <div className={`flex-1 ${chatId ? "md:block" : "md:hidden"}`}>
          {chatId ? (
            <ChatWindow />
          ) : (
            <Image
              className="h-full object-contain"
              alt="empty"
              src={EmptyImage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Chat.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
