import React, { useState } from "react";
import LobbyPage from "./Lobby";
import GamePage from "./Game";

export default function MainPage() {
  const [room, setRoom] = useState<string>("");

  if (room) return <GamePage room={room} setRoom={setRoom} />;
  else return <LobbyPage setRoom={setRoom} />;
}
