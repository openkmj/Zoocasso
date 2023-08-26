import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../Game.module.css";
import {
  C2SEventType,
  ChattingUpdatedPayload,
  GameConfig,
  GameStatus,
  Member,
  MemberUpdatedPayload,
  S2CEventType,
  StatusUpdatedPayload,
} from "../class/game";
import ClockTimer from "../component/ClockTimer";
import GameConfigEditor from "../component/GameConfig/ConfigEditor";
import GameConfigViewer from "../component/GameConfig/ConfigViewer";
import Icon, { IconType } from "../component/Icon";
import useTimerCount from "../hook/useTimerCount";
import useModalStore from "../store/modal";
import useUserStore from "../store/user";
import CanvasManager from "../util/CanvasManager";
import GameManager from "../util/GameManager";

const SHOW_TURN_RESULT_TIME = 5000;
const SELECTING_WORD_TIME = 15 * 1000;

const CANVAS_SIZE = 128;

export default function GamePage({
  room,
  setRoom,
}: {
  room: string;
  setRoom: (room: string) => void;
}) {
  const { id, name, character, isManager } = useUserStore();
  const { openModal, closeModal } = useModalStore();
  const [chatInput, setChatInput] = useState("");
  const [chatList, setChatList] = useState<
    {
      type: "SYS" | "USR";
      speaker: {
        id: string;
        name: string;
      };
      text: string;
    }[]
  >([]);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    maxPlayer: 6,
    drawTime: 80,
    round: 3,
    showWordLength: true,
    customWord: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager>();
  const canvasManagerRef = useRef<CanvasManager>();
  const [isOnGame, setIsOnGame] = useState(false);
  const [drawTimeCount, startDrawTimeCount] = useTimerCount();
  const chatListRef = useRef<HTMLDivElement>(null);

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
        member: { id, name, character },
        text: chatInput.trim(),
      },
    });

    setChatInput("");
  };

  const skip = () => {
    if (!gameManagerRef.current) return;

    gameManagerRef.current.emitEvent({
      roomId: room,
      type: C2SEventType.SKIP,
      payload: {},
    });
  };
  const share = () => {
    navigator.clipboard.writeText(location.href).then(() => {
      alert("클립보드에 복사되었습니다.");
    });
  };

  const updateSetting = useCallback(
    (config: GameConfig) => {
      if (!gameManagerRef.current) return;
      gameManagerRef.current.emitEvent({
        roomId: room,
        type: C2SEventType.UPDATE_SETTING,
        payload: {
          config: config,
        },
      });
    },
    [room]
  );

  const startGame = useCallback(() => {
    if (!gameManagerRef.current) return;
    gameManagerRef.current.emitEvent({
      roomId: room,
      type: C2SEventType.START,
      payload: {},
    });
  }, [room]);

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
    gameManagerRef.current = new GameManager(room, {
      id,
      name,
      character,
      isManager,
    });
    gameManagerRef.current.connect();
    gameManagerRef.current.addEventListener(
      S2CEventType.CHATTING_UPDATED,
      (p: ChattingUpdatedPayload) => {
        setChatList((i) =>
          i.concat({
            type: p.type,
            speaker:
              p.type === "SYS" ? { id: "SYS", name: "System" } : p.member,
            text: p.text,
          })
        );
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
        if (p.status === GameStatus.PENDING) setIsOnGame(false);
        else setIsOnGame(true);
        switch (p.status) {
          case GameStatus.DRAWING: {
            closeModal("SELECT_WORD");
            closeModal("WAIT_WORD");
            startDrawTimeCount(80, () => {
              console.log("time's up");
            });
            return;
          }
          case GameStatus.SELECTING_WORD: {
            canvasManagerRef.current?.clear();
            if (p.turnResult) {
              console.log(p.turnResult);
              openModal("ANSWER", {
                answer: p.turnResult.answer,
                scoreBoard: p.turnResult.scoreBoard,
              }); // show turn result
              setTimeout(() => {
                closeModal("ANSWER");
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
              }, SHOW_TURN_RESULT_TIME);
            } else {
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
            }

            return;
          }
          case GameStatus.PENDING: {
            // who is the winner?
            canvasManagerRef.current?.clear();
            if (p.turnResult) {
              openModal("ANSWER", {
                answer: p.turnResult.answer,
                scoreBoard: p.turnResult.scoreBoard,
              });
              setTimeout(() => {
                closeModal("ANSWER");
              }, SHOW_TURN_RESULT_TIME);
            }
            console.log(p);
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
    gameManagerRef.current.addEventListener(
      S2CEventType.SETTING_UPDATED,
      (p) => {
        setGameConfig(p.config);
      }
    );
  }, [room, id, name, isManager, openModal, closeModal, startDrawTimeCount]);

  useEffect(() => {
    setTimeout(() => {
      chatListRef.current?.scrollBy({
        top: 99999,
        behavior: "smooth",
      });
    }, 100);
  }, [chatList]);

  return (
    <div className={styles.game}>
      <div className={styles.header}>
        <div className={styles.left}>
          <ClockTimer count={drawTimeCount} />
          <span>
            ({currentRound}/{gameConfig.round})
          </span>
        </div>
        <div className={styles.center}>?</div>
        <div className={styles.right}>
          <div className={styles.skipButton}>
            <Icon type={IconType.SKIP} width={20} height={20} color="white" />
          </div>
          <div className={styles.shareButton}>
            <Icon type={IconType.SHARE} width={20} height={20} color="white" />
          </div>
        </div>
      </div>
      <div className={styles.mainView}>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef}></canvas>
          {!isOnGame && (
            <>
              {isManager ? (
                <GameConfigEditor
                  start={startGame}
                  onConfigChange={updateSetting}
                />
              ) : (
                <GameConfigViewer config={gameConfig} />
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.chatList} ref={chatListRef}>
        {chatList.map((i, idx) => (
          <div
            className={
              i.type === "SYS"
                ? `${styles.chatItem} ${styles.system}`
                : id === i.speaker.id
                ? `${styles.chatItem} ${styles.mine}`
                : styles.chatItem
            }
            key={idx}
          >
            <div className={styles.speaker}>{i.speaker.name}</div>
            <div className={styles.text}>{i.text}</div>
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
        <button onClick={sendChat}>
          <Icon type={IconType.SEND} width={19} height={24} color="white" />
        </button>
      </div>
    </div>
  );
}
