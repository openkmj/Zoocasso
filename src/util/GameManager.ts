import { Socket, io } from "socket.io-client";
import { C2SEvent, Member, S2CEventType } from "../class/game";

const SOCKET_SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export default class GameManager {
  roomId: string;
  socket: Socket;
  isConnected = false;
  constructor(roomId: string, member: Member) {
    this.roomId = roomId;
    this.socket = io(SOCKET_SERVER_URL);

    this.socket.on("connect", () => {
      console.log("connection created");
      this.socket.emit("JOIN", {
        roomId: this.roomId,
        member: member,
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
  addEventListener(type: S2CEventType, callback: (params: any) => void) {
    this.socket.on(type, callback);
  }
  emitEvent(event: C2SEvent) {
    if (!this.isConnected) return;
    this.socket.emit(event.type, event.payload);
  }
}
