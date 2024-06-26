import { useSelector } from "react-redux";

export const useChatUserListSelector = () =>
  useSelector((state) => state.chat.userList);

export const useChatUserListPageSelector = () =>
  useSelector((state) => state.chat.userListPage);

export const useChatUserListSortSelector = () =>
  useSelector((state) => state.chat.userListSort);

export const useChatUserListTotalCountSelector = () =>
  useSelector((state) => state.chat.userListTotalCount);

export const useChatUserListFilterSelector = () =>
  useSelector((state) => state.chat.userListFilter);

export const useChatIsBlockedSelector = () =>
  useSelector((state) => state.chat.isBlocked);

export const useChatUserListSearchSelector = () =>
  useSelector((state) => state.chat.userListSearch);

export const useChatIdSelector = () =>
  useSelector((state) => state.chat.chatId);

export const useCurrentChatSelector = () =>
  useSelector((state) => state.chat.currentChat);

export const useMessageListSelector = () =>
  useSelector((state) => state.chat.messageList);

export const useSavedMessageDlgSelector = () =>
  useSelector((state) => state.chat.showSavedMsgDialog);

export const useChatListLoadingSelector = () =>
  useSelector((state) => state.chat.isChatListLoading);

export const useChatSocketSelector = () =>
  useSelector((state) => state.chat.socket_event);

export const useSavedMessageListSelector = () =>
  useSelector((state) => state.chat.savedMessageList);

export const useScheduleMessageListSelector = () =>
  useSelector((state) => state.chat.scheduleMessageList);

export const useScheduleMessageTemplatesSelector = () =>
  useSelector((state) => state.chat.scheduleMessageTemplates);
