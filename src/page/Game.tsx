import React, { useEffect, useRef, useState } from "react";
import GameManager from "../util/GameManager";

export default function GamePage({
  room,
  setRoom,
}: {
  room: string;
  setRoom: (room: string) => void;
}) {
  const [chatInput, setChatInput] = useState("");
  const [chatList, setChatList] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager>();
  const leaveRoom = () => {
    // TODO: leave room
    setRoom("");
  };
  const sendChat = () => {
    if (!chatInput || !gameManagerRef.current) return;
    gameManagerRef.current.emitEvent("CHAT", {
      type: "USR",
      member: { id: 0, name: "chat-user" },
      text: chatInput,
    });
    setChatInput("");
  };
  useEffect(() => {
    // init canvas
    if (canvasRef.current) {
      console.log("canvas~");
      canvasRef.current.width = 600;
      canvasRef.current.height = 600;
    }
    // init game manager
    gameManagerRef.current = new GameManager(room);
    gameManagerRef.current.connect();
    gameManagerRef.current.addEventListener("CHATTING_UPDATED", (p) => {
      console.log("i got chatting");
      if (p.type === "SYS") {
        setChatList((i) => i.concat(p.text));
      } else {
        setChatList((i) => i.concat(`${p.member.name}: ${p.text}`));
      }
    });
  }, [room]);
  return (
    <div className="game">
      <div className="top">round(1/3)</div>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="chat">
        <div className="chat-list">
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          <div className="item">minjae: hi</div>
          {chatList.map((i, idx) => (
            <div className="item" key={idx}>
              {i}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            maxLength={100}
            value={chatInput}
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendChat();
              }
            }}
          />
          <button onClick={sendChat}>{"=>"}</button>
        </div>
      </div>
    </div>
  );
}
