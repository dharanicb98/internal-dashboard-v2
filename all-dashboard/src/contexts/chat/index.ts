import React from "react";
import { ChatResponse, MessageType } from "types/chat";

export const ChatContext = React.createContext<ChatContextType>({});

export interface ChatContextType {
  updateChatData?: (p?: any) => any;
  fetchUserList?: (p?: any) => any;
  chatData?: ChatResponse["data"];
  chatId?: string;
  newMessage?: Record<string, MessageType>;
}
