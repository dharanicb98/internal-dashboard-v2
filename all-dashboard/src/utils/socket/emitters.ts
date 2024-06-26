import socket from ".";

export const emitMessage = <T>(data: T) => {
  socket.emit("send_message", data);
};

export const updateMessageStatus = <T>(data: T) => {
  socket.emit("update_message_status", data);
};
export const updateOnlineStatus = <T>(isHost: boolean, data: T) => {
  if (isHost) {
    socket.emit("get_host_online_offline", data);
  } else {
    socket.emit("get_user_online_offline", data);
  }
};

export const setOnlineStatus = (isHost: boolean, userId: string) => {
  socket.emit(isHost ? "get_host_online_offline" : "get_user_online_offline", {
    id: userId,
    isOnline: 1,
  });
};
