import React from "react";
import styles from "./index.module.css";

export interface WaitWordProps {
  player: string;
}

interface ModalWaitWordProps {
  props: WaitWordProps;
  closeModal: () => void;
}

export default function ModalWaitWord({
  props: { player },
  closeModal,
}: ModalWaitWordProps) {
  return (
    <div className={styles.modalLayout}>
      <div className={styles.modalTitle}>It's {player}'s turn!</div>
      <div className={`${styles.modalText} title`}>Wait For Word</div>
      <div>{/* loading indicator */}</div>
      <div>waiting(15)</div>
    </div>
  );
}
