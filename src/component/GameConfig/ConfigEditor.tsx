import React, { useCallback, useEffect, useState } from "react";
import { GameConfig } from "../../class/game";
import CustomSlider from "../Slider";
import styles from "./index.module.css";

const MAX_PLAYER_MAP = [4, 5, 6, 7, 8];
const DRAW_TIME_MAP = [60, 80, 100];
const ROUND_MAP = [1, 2, 3, 4, 5];

interface GameConfigProps {
  start: () => void;
  onConfigChange: (config: GameConfig) => void;
}

const GameConfigEditor = ({ start, onConfigChange }: GameConfigProps) => {
  const [maxPlayer, setMaxPlayer] = useState(6);
  const [drawTime, setDrawTime] = useState(80);
  const [round, setRound] = useState(3);
  const [showWordLength, setShowWordLength] = useState(true);
  const [customWord, setCustomWord] = useState(false);

  const handleConfigChange = useCallback(
    (config: GameConfig) => {
      // TODO: apply debounce
      onConfigChange({
        maxPlayer: config.maxPlayer,
        drawTime: config.drawTime,
        round: config.round,
        showWordLength: config.showWordLength,
        customWord: config.customWord,
      });
    },
    [onConfigChange]
  );

  useEffect(() => {
    handleConfigChange({
      maxPlayer,
      drawTime,
      round,
      showWordLength,
      customWord,
    });
  }, [
    handleConfigChange,
    maxPlayer,
    drawTime,
    round,
    showWordLength,
    customWord,
  ]);

  const handleStart = () => {
    start();
  };
  return (
    <div className={styles.setting}>
      <div className="title">Setting</div>
      <div className={styles.configList}>
        <div className={styles.config}>
          <div>max player</div>
          <CustomSlider
            type="normal"
            afterChange={(idx) => {
              setMaxPlayer(MAX_PLAYER_MAP[idx]);
            }}
            initialSlide={2}
          >
            {MAX_PLAYER_MAP.map((i) => (
              <div key={i}>{i}</div>
            ))}
          </CustomSlider>
        </div>
        <div className={styles.config}>
          <div>drawing time</div>
          <CustomSlider
            type="normal"
            afterChange={(idx) => {
              setDrawTime(DRAW_TIME_MAP[idx]);
            }}
            initialSlide={1}
          >
            {DRAW_TIME_MAP.map((i) => (
              <div key={i}>{i}</div>
            ))}
          </CustomSlider>
        </div>
        <div className={styles.config}>
          <div>rounds</div>
          <CustomSlider
            type="normal"
            afterChange={(idx) => {
              setRound(ROUND_MAP[idx]);
            }}
            initialSlide={2}
          >
            {ROUND_MAP.map((i) => (
              <div key={i}>{i}</div>
            ))}
          </CustomSlider>
        </div>
        <div>
          <CustomSlider
            type="full"
            afterChange={(idx) => {
              setShowWordLength(idx === 0);
            }}
          >
            <div>show word length</div>
            <div>hide word length</div>
          </CustomSlider>
        </div>
        <div>
          <CustomSlider
            type="full"
            afterChange={(idx) => {
              setCustomWord(idx === 1);
            }}
          >
            <div>use given words</div>
            <div>use custom words</div>
          </CustomSlider>
        </div>
      </div>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default GameConfigEditor;
