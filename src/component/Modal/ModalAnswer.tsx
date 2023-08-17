import React from "react";
import { MemberForScore } from "../../class/game";
import styles from "./index.module.css";

export interface AnswerProps {
  answer: string;
  scoreBoard: MemberForScore[];
}

interface ModalAnswerProps {
  props: AnswerProps;
  closeModal: () => void;
}

export default function ModalAnswer({
  props: { answer, scoreBoard },
  closeModal,
}: ModalAnswerProps) {
  if (!answer || !scoreBoard) return;
  return (
    <div className={styles.modalLayout}>
      <div className={styles.modalTitle}>The answer is {answer}</div>
      <div>
        {scoreBoard.map((m) => (
          <div>
            {m.name}: {m.turnScore} {"->"} {m.score}
          </div>
        ))}
      </div>
    </div>
  );
}
