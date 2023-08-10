import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../Game.module.css";
import {
  C2SEventType,
  ChattingUpdatedPayload,
  GAME_STATUS,
  Member,
  MemberUpdatedPayload,
  S2CEventType,
  StatusUpdatedPayload,
} from "../class/game";
import useModalStore from "../store/modal";
import useUserStore from "../store/user";
import CanvasManager from "../util/CanvasManager";
import GameManager from "../util/GameManager";

const CANVAS_SIZE = 128;

export default function GamePage({
  room,
  setRoom,
}: {
  room: string;
  setRoom: (room: string) => void;
}) {
  const { id, name, isManager } = useUserStore();
  const { openModal, closeModal } = useModalStore();
  const [chatInput, setChatInput] = useState("");
  const [chatList, setChatList] = useState<string[]>([]);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager>();
  const canvasManagerRef = useRef<CanvasManager>();
  const [isOnGame, setIsOnGame] = useState(false);
  const leaveRoom = () => {
    // TODO: leave room
    setRoom("");
  };
  const sendChat = () => {
    if (!chatInput || !chatInput.trim() || !gameManagerRef.current) return;

    gameManagerRef.current.emitEvent({
      roomId: room,
      type: C2SEventType.CHAT,
      payload: {
        type: "USR",
        member: { id, name },
        text: chatInput.trim(),
      },
    });

    setChatInput("");
  };
  const startGame = () => {
    if (!gameManagerRef.current) return;
    gameManagerRef.current.emitEvent({
      roomId: room,
      type: C2SEventType.START,
      payload: {},
    });
  };

  const handleCanvasUpdated = useCallback(
    (b: ArrayBuffer) => {
      if (!gameManagerRef.current) return;
      gameManagerRef.current.emitEvent({
        roomId: room,
        type: C2SEventType.DRAW,
        payload: {
          data: b,
        },
      });
    },
    [room]
  );
  // const handler = useCallback(
  //   (p: any) => {
  //     console.log(p);
  //     canvasManagerRef.current?.syncCanvas(p);
  //   },
  //   [canvasManagerRef]
  // );

  useEffect(() => {
    // init canvas
    if (!canvasRef.current) return;
    console.log("canvas~");
    canvasRef.current.width = CANVAS_SIZE;
    canvasRef.current.height = CANVAS_SIZE;

    canvasManagerRef.current = new CanvasManager(
      canvasRef.current,
      handleCanvasUpdated
    );
  }, [canvasRef, handleCanvasUpdated]);

  useEffect(() => {
    console.log("game use effect");
    if (gameManagerRef.current) return;

    // init game manager
    gameManagerRef.current = new GameManager(room, { id, name, isManager });
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
        if (p.status === GAME_STATUS.PENDING) setIsOnGame(false);
        else setIsOnGame(true);
        switch (p.status) {
          case GAME_STATUS.DRAWING: {
            closeModal("SELECT_WORD");
            closeModal("WAIT_WORD");
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
            // game result ? show game result 5s : pass
            // show 3 words if my turn
            // or stay
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
              openModal("WAIT_WORD", {
                player: "???",
              });
            }
            return;
          }
          case GAME_STATUS.PENDING: {
            // who is the winner?
            setIsOnGame(false);
            return;
          }
        }
      }
    );
    gameManagerRef.current.addEventListener(
      S2CEventType.CANVAS_UPDATED,
      // handler
      (p) => {
        canvasManagerRef.current?.syncCanvas(p.data);
      }
    );
  }, [room, id, name, isManager, openModal]);
  return (
    <div className={styles.game}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span>round(1/3)</span>
          <span>80</span>
        </div>
        <div className={styles.center}>?</div>
        <div className={styles.right}>menu</div>
      </div>
      <div className={styles.mainView}>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef}></canvas>
          {!isOnGame && (
            <div className={styles.setting}>
              <div className="title">Setting</div>
              <div>
                <div>
                  <div>max player</div>
                  <div>0</div>
                </div>
                <div>
                  <div>drawing time</div>
                  <div>0</div>
                </div>
                <div>
                  <div>rounds</div>
                  <div>0</div>
                </div>
                <div>
                  <div>show word length</div>
                </div>
                <div>
                  <div>use custom word</div>
                </div>
              </div>
              {isManager && (
                <button onClick={startGame}>
                  {/* <button onClick={startGame} disabled={memberList.length <= 1}> */}
                  Start Game
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.chatList}>
        {chatList.map((i, idx) => (
          <div className="item" key={idx}>
            {i}
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          placeholder="Enter your Meow~"
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
  );
}
