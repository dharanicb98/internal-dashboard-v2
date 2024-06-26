import { io } from "socket.io-client";

const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL as string;

const socket = io(socketURL, {
  transports: ["websocket"],
});

export default socket;
