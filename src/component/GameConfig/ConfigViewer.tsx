import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { GameConfig } from "../../class/game";
import CustomSlider from "../Slider";
import styles from "./index.module.css";

const MAX_PLAYER_MAP = [4, 5, 6, 7, 8];
const DRAW_TIME_MAP = [60, 80, 100];
const ROUND_MAP = [1, 2, 3, 4, 5];

interface GameConfigProps {
  config: GameConfig;
}

const GameConfigViewer = ({ config }: GameConfigProps) => {
  const maxPlayerRef = useRef<Slider>(null);
  const drawTimeRef = useRef<Slider>(null);
  const roundRef = useRef<Slider>(null);
  const showWordLengthRef = useRef<Slider>(null);
  const customWordRef = useRef<Slider>(null);

  useEffect(() => {
    maxPlayerRef.current?.slickGoTo(
      MAX_PLAYER_MAP.findIndex((i) => i === config.maxPlayer)
    );
    drawTimeRef.current?.slickGoTo(
      DRAW_TIME_MAP.findIndex((i) => i === config.drawTime)
    );
    roundRef.current?.slickGoTo(ROUND_MAP.findIndex((i) => i === config.round));
    showWordLengthRef.current?.slickGoTo(config.showWordLength ? 0 : 1);
    customWordRef.current?.slickGoTo(config.customWord ? 1 : 0);
  }, [config]);

  return (
    <div className={styles.setting}>
      <div className="title">Setting</div>
      <div className={styles.configList}>
        <div className={styles.config}>
          <div>max player</div>
          <CustomSlider
            type="normal"
            sliderRef={maxPlayerRef}
            swipe={false}
            arrows={false}
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
            sliderRef={drawTimeRef}
            swipe={false}
            arrows={false}
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
            sliderRef={roundRef}
            swipe={false}
            arrows={false}
          >
            {ROUND_MAP.map((i) => (
              <div key={i}>{i}</div>
            ))}
          </CustomSlider>
        </div>
        <div>
          <CustomSlider
            type="full"
            sliderRef={showWordLengthRef}
            swipe={false}
            arrows={false}
          >
            <div>show word length</div>
            <div>hide word length</div>
          </CustomSlider>
        </div>
        <div>
          <CustomSlider
            type="full"
            sliderRef={customWordRef}
            swipe={false}
            arrows={false}
          >
            <div>use given words</div>
            <div>use custom words</div>
          </CustomSlider>
        </div>
      </div>
    </div>
  );
};

export default GameConfigViewer;
