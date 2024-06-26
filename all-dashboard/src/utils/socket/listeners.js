import socket from ".";

export const listenMessageStatus = (callback) => {
  socket.on("message_status", callback);
};

export const listenMessages = (event, callback) => {
  console.log("listen message", event);
  socket.on(event, callback);
};

export const disconnectListener = (event) => {
  console.log("disconnect listener", event);
  socket.off(event);
};

export const removeChatWindowListener = () => {
  socket.off("message_status");
};

export const initialSocketListeners = (userDetails, callback) => {
  socket.emit("set_token", { ...userDetails, socket: socket.id });
  socket.on("connect", () => {
    socket.emit("set_token", { ...userDetails, socket: socket.id });
  });
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
  socket.on("reload_chat", () => {
    callback({ name: 'reload_chat' })
  });
  socket.on("reload_blocked", (data) => {
    callback({ name: 'reload_blocked', data })
  });
};

export default socket;
