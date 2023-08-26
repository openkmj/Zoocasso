import React from "react";
import Icon, { IconType } from "../Icon";
import styles from "./index.module.css";

interface ClockTimerProps {
  count: number;
}

const ClockTimer = ({ count }: ClockTimerProps) => {
  return (
    <div className={styles.clockTimer}>
      <Icon type={IconType.CLOCK} width={38} height={38} color="#fff" />
      <div
        className={
          count !== 0 ? `${styles.count} ${styles.active}` : styles.count
        }
      >
        {count}
      </div>
    </div>
  );
};

export default ClockTimer;
