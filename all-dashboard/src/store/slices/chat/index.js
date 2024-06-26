import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "",
  socket_event: { name: "" },
  showSavedMsgDialog: false,
  isChatListLoading: false,
  userList: [],
  isBlocked: false,
  messageList: [],
  savedMessageList: [],
  scheduleMessageList: [],
  scheduleMessageTemplates: [],
  currentChat: {},
  userListPage: 1,
  userListTotalCount: 0,
  userListSort: "",//
  userListFilter: [],
  userListSearch: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    updateUserList: (state, action) => {
      if (state.userListPage != 1) {
        state.userList = [...state.userList, ...action.payload];
      } else {
        state.userList = action.payload;
      }
    },
    updateUserListPage: (state, action) => {
      state.userListPage = action.payload;
    },
    updateUserListSort: (state, action) => {
      state.userListSort = action.payload;
    },
    updateUserListFilter: (state, action) => {
      state.userListFilter = action.payload;
    },
    updateUserListSearch: (state, action) => {
      state.userListSearch = action.payload;
    },
    updateUserListTotalCount: (state, action) => {
      state.userListTotalCount = action.payload;
    },
    updateMessageList: (state, action) => {
      console.log('updateMessageList', 'updateMessageList');
      state.messageList = action.payload;
    },
    updateIsBlocked: (state, action) => {
      state.isBlocked = action.payload;
    },
    pushNewMessage: (state, action) => {
      console.log('updateMessageList', 'pushNewMessage');
      state.messageList = [...state.messageList, action.payload];
    },
    updateMessageStatusToRead: (state, action) => {
      console.log('updateMessageList', 'updateMessageStatusToRead');
      const mappedUpdatedStatus = state.messageList.map((item) => ({
        ...item,
        messageStatus: "Read",
      }));
      // state.messageList = [...state.messageList, ...mappedUpdatedStatus];
      state.messageList = mappedUpdatedStatus;
    },
    updateChatId: (state, action) => {
      state.chatId = action.payload;
    },
    updateCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    updateSavedMessageList: (state, action) => {
      state.savedMessageList = action.payload;
    },
    updateScheduleMessageList: (state, action) => {
      state.scheduleMessageList = action.payload;
    },
    updateScheduleMessageTemplates: (state, action) => {
      state.scheduleMessageTemplates = action.payload;
    },
    toggleSavedMessageDlgVisibility: (state, action) => {
      state.showSavedMsgDialog = action.payload;
    },
    setSocketEvents: (state, action) => {
      state.socket_event = action.payload;
    },
    toggleChatListLoading: (state, action) => {
      state.isChatListLoading = action.payload;
    },
  },
});

export const {
  updateUserList,
  updateChatId,
  updateCurrentChat,
  updateUserListPage,
  updateUserListSort,
  updateUserListFilter,
  updateUserListSearch,
  updateUserListTotalCount,
  updateMessageList,
  updateSavedMessageList,
  updateScheduleMessageList,
  updateScheduleMessageTemplates,
  pushNewMessage,
  updateMessageStatusToRead,
  toggleSavedMessageDlgVisibility,
  updateIsBlocked,
  setSocketEvents,
  toggleChatListLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
