import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { GameConfig } from "../../class/game";
import styles from "./index.module.css";

const MAX_PLAYER_MAP = [4, 5, 6, 7, 8];
const DRAW_TIME_MAP = [60, 80, 100];
const ROUND_MAP = [1, 2, 3, 4, 5];

interface GameConfigProps {
  start?: () => void;
  onConfigChange?: (config: GameConfig) => void;
}

const GameConfig = ({ start, onConfigChange }: GameConfigProps) => {
  const [maxPlayer, setMaxPlayer] = useState(6);
  const [drawTime, setDrawTime] = useState(80);
  const [round, setRound] = useState(3);
  const [showWordLength, setShowWordLength] = useState(true);
  const [customWord, setCustomWord] = useState(false);

  const handleConfigChange = useCallback(
    (config: GameConfig) => {
      // TODO: apply debounce
      if (onConfigChange)
        onConfigChange({
          drawTime: config.drawTime,
          round: config.round,
          showWordLength: config.showWordLength,
          customWord: config.customWord,
        });
    },
    [onConfigChange]
  );

  useEffect(() => {
    handleConfigChange({ drawTime, round, showWordLength, customWord });
  }, [handleConfigChange, drawTime, round, showWordLength, customWord]);

  const handleStart = () => {
    if (start) start();
  };
  return (
    <div className={styles.setting}>
      <div className="title">Setting</div>
      <div className={styles.configList}>
        <div className={styles.config}>
          <div>max player</div>
          <Slider
            className={styles.slick}
            arrows={false}
            afterChange={(idx) => {
              setMaxPlayer(MAX_PLAYER_MAP[idx]);
            }}
            initialSlide={2}
          >
            {MAX_PLAYER_MAP.map((i) => (
              <div>{i}</div>
            ))}
          </Slider>
        </div>
        <div className={styles.config}>
          <div>drawing time</div>
          <Slider
            className={styles.slick}
            arrows={false}
            afterChange={(idx) => {
              setDrawTime(DRAW_TIME_MAP[idx]);
            }}
            initialSlide={1}
          >
            {DRAW_TIME_MAP.map((i) => (
              <div>{i}</div>
            ))}
          </Slider>
        </div>
        <div className={styles.config}>
          <div>rounds</div>
          <Slider
            className={styles.slick}
            arrows={false}
            afterChange={(idx) => {
              setRound(ROUND_MAP[idx]);
            }}
            initialSlide={2}
          >
            {ROUND_MAP.map((i) => (
              <div>{i}</div>
            ))}
          </Slider>
        </div>
        <div>
          <Slider className={styles.longSlick} arrows={false}>
            <div>show word length</div>
            <div>hide word length</div>
          </Slider>
        </div>
        <div>
          <Slider
            className={styles.longSlick}
            arrows={false}
            nextArrow={<div>{">"}</div>}
            prevArrow={<div>{"<"}</div>}
          >
            <div>use given words</div>
            <div>use custom words</div>
          </Slider>
        </div>
      </div>
      {start && (
        <button onClick={handleStart}>
          {/* <button onClick={startGame} disabled={memberList.length <= 1}> */}
          Start Game
        </button>
      )}
    </div>
  );
};

export default GameConfig;
