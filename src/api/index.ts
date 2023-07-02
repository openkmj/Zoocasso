import axios from "axios";
import { RoomPreview } from "../class/room";
import { RoomConfig } from "../class/game";

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

const createRoom = (config: RoomConfig) => {
  return instance
    .post("/room", {
      is_private: config.isPrivate,
      language: config.language,
    })
    .then(({ data }) => data.room_id as string);
};

const joinRoom = (roomId?: string) => {
  return instance
    .post("/room/join", {
      roomId,
    })
    .then(({ data }) => data.room_id as string);
};

const api = Object.freeze({
  getRoomInfo,
  createRoom,
  joinRoom,
});

export default api;
