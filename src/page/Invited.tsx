import React, { useState } from "react";
import LobbyPage from "./Lobby";
import { useLoaderData } from "react-router-dom";
import api from "../api";
import { RoomPreview } from "../class/room";
import GamePage from "./Game";

export const loader = async ({ params }: any) => {
  try {
    const roomInfo = await api.getRoomInfo(params.id);
    return roomInfo;
  } catch (e) {
    throw new Response("No Such Room: Check your invitation code.", {
      status: 404,
      statusText: "Room Not Found",
    });
  }
};

export default function InvitedPage() {
  const [room, setRoom] = useState<string>("");
  const roomPreview = useLoaderData() as RoomPreview;

  if (room) return <GamePage room={room} setRoom={setRoom} />;
  else return <LobbyPage setRoom={setRoom} roomPreview={roomPreview} />;
}
