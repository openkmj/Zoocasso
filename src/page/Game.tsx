import React, { useEffect, useRef, useState } from "react";
import GameManager from "../util/GameManager";
import {
  C2SEventType,
  ChattingUpdatedPayload,
  GAME_STATUS,
  Member,
  MemberUpdatedPayload,
  S2CEventType,
  StatusUpdatedPayload,
} from "../class/game";
import useGameStore from "../store";
import MemberList from "../component/MemberList";
import useModalStore from "../store/modal";

export default function GamePage({
  room,
  setRoom,
}: {
  room: string;
  setRoom: (room: string) => void;
}) {
  const { user } = useGameStore();
  const { openModal } = useModalStore();
  const [chatInput, setChatInput] = useState("");
  const [chatList, setChatList] = useState<string[]>([]);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager>();
  const leaveRoom = () => {
    // TODO: leave room
    setRoom("");
  };
  const sendChat = () => {
    if (!chatInput || !gameManagerRef.current) return;
    if (chatInput === "start") {
      gameManagerRef.current.emitEvent({
        roomId: room,
        type: C2SEventType.START,
        payload: {},
      });
    } else {
      gameManagerRef.current.emitEvent({
        roomId: room,
        type: C2SEventType.CHAT,
        payload: {
          type: "USR",
          member: { id: user.id, name: user.name },
          text: chatInput,
        },
      });
    }

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
    gameManagerRef.current = new GameManager(room, user);
    gameManagerRef.current.connect();
    gameManagerRef.current.addEventListener(
      S2CEventType.CHATTING_UPDATED,
      (p: ChattingUpdatedPayload) => {
        if (p.type === "SYS") {
          setChatList((i) => i.concat(p.text));
        } else {
          setChatList((i) => i.concat(`${p.member.name}: ${p.text}`));
        }
      }
    );
    gameManagerRef.current.addEventListener(
      S2CEventType.MEMBER_UPDATED,
      (p: MemberUpdatedPayload) => {
        console.log(p);
        setMemberList(p.memberList);
      }
    );
    gameManagerRef.current.addEventListener(
      S2CEventType.STATUS_UPDATED,
      (p: StatusUpdatedPayload) => {
        switch (p.status) {
          case GAME_STATUS.DRAWING: {
            if (p.words && p.words.length > 0) {
              console.log(p.words[0]);
              //@ts-ignore
              setChatList((i) => i.concat(`${p.words[0]}를 선택하셨습니다.`));
            } else {
              setChatList((i) => i.concat("단어 고르기 끝"));
            }
            return;
          }
          case GAME_STATUS.SELECTING_WORD: {
            if (p.words) {
              openModal("SELECT_WORD", {
                words: p.words,
                callback: (word: string) => {
                  gameManagerRef.current?.emitEvent({
                    roomId: room,
                    type: C2SEventType.SELECT_WORD,
                    payload: {
                      word: word,
                    },
                  });
                },
              });
            } else {
              setChatList((i) => i.concat("단어 선택 중..."));
            }
            // show 3 words if my turn
            // or stay
            return;
          }
          case GAME_STATUS.PENDING: {
            // who is the winner?
            return;
          }
        }
      }
    );
  }, [room]);
  return (
    <div className="game">
      <div className="top">round(1/3)</div>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef}></canvas>
      </div>
      <MemberList memberList={memberList} />
      <div className="chat">
        <div className="chat-list">
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
