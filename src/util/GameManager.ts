import { Socket, io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export default class GameManager {
  roomId: string;
  socket: Socket;
  isConnected = false;
  constructor(roomId: string) {
    this.roomId = roomId;
    this.socket = io(SOCKET_SERVER_URL);

    this.socket.on("connect", () => {
      console.log("connection created");
      this.socket.emit("JOIN", {
        roomId: this.roomId,
        member: {
          id: "123",
          name: "mjk",
        },
      });
    });
  }
  connect() {
    this.socket.connect();
    this.isConnected = true;
  }
  disconnect() {
    if (!this.isConnected) return;
    this.socket.disconnect();
  }
  addEventListener(type: string, callback: (params: any) => void) {
    this.socket.on(type, callback);
  }
  emitEvent(type: string, params: any) {
    if (!this.isConnected) return;
    this.socket.emit(type, params);
  }
}
