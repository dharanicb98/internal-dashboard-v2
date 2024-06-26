export type ChatResponse = APIResponse<Chat[]>;

export interface Chat {
  _id: string;
  user: User;
  host: Host;
  lastMessage: MessageType;
  latestOpenOrder?: LatestOpenOrder;
  unreadCount: number;
}

interface User {
  id: string;
  name: string;
  image: string;
  isOnline: number;
}

interface Host {
  id: string;
  name: string;
  image: string;
  isOnline: number;
}

interface LatestOpenOrder {
  startDate: string;
  endDate: string;
  propertyName: string;
  bookedOn: string;
  propertyId: string;
  ReservationCode: string;
  guests: Guest[];
}

interface Guest {
  name: string;
  image: string;
  isPrimary: boolean;
}
export type MessageResponse = APIResponse<MessageType[]>;
export interface MessageType {
  _id: string;
  content: string;
  contentUrl?: string;
  contentType: string;
  conversationId: string;
  fileName?: string;
  timestamp: string;
  senderId: string;
  messageStatus: string;
}

export interface ScheduleMessageType {
  _id: string;
  hostId: string;
  templateName: string;
  message: string;
  action: string;
  scheduleTime: string;
}

export interface SavedMessageType {
  _id: string;
  hostId: string;
  templateName: string;
  message: string;
}
