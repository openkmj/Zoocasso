import axios from "axios";
import { RoomPreview } from "../class/room";
import { AvailableLangugae, RoomConfig } from "../class/game";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// instance.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     // TODO: handle http request error
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

const getRoomInfo = (roomId: string) => {
  return instance
    .get(`/room/${roomId}`)
    .then(({ data }) => new RoomPreview(data));
};

const createRoom = (
  name: string,
  config: {
    isPrivate: boolean;
    language: AvailableLangugae;
  }
) => {
  return instance
    .post("/room", {
      name: name,
      is_private: config.isPrivate,
      language: config.language,
    })
    .then(({ data }) => data.room_id as string);
};

const joinRoom = (name: string, roomId?: string) => {
  return instance
    .post("/room/join", {
      name: name,
      room_id: roomId,
    })
    .then(({ data }) => data.room_id as string);
};

const api = Object.freeze({
  getRoomInfo,
  createRoom,
  joinRoom,
});

export default api;
