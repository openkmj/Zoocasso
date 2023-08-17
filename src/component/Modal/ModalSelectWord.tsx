import React, { useState } from "react";
import styles from "./index.module.css";

export interface SelectWordProps {
  words: string[];
  callback: (word: string) => void;
}

interface ModalSelectWordProps {
  props: SelectWordProps;
  closeModal: () => void;
}

export default function ModalSelectWord({
  closeModal,
  props: { words, callback },
}: ModalSelectWordProps) {
  const [selected, setSelected] = useState("");
  if (!words || !callback) return <></>;
  return (
    <div className={styles.modalLayout}>
      <div className={styles.modalTitle}>It's Your Turn</div>
      <div className={`${styles.modalText} title`}>Choose the word</div>
      <div className={styles.wordList}>
        {words.map((i) => (
          <button
            key={i}
            onClick={() => {
              setSelected(i);
              // closeModal();
            }}
            className={
              selected === i
                ? `${styles.wordButton} ${styles.selected}`
                : styles.wordButton
            }
          >
            {i}
          </button>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            if (!selected) return;
            callback(selected);
          }}
        >
          ok
        </button>
      </div>
    </div>
  );
}
