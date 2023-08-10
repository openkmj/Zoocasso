import React from "react";

export interface AnswerProps {
  answer: string;
  ranking: {
    id: string;
    name: string;
    turnScore: number;
    score: number;
  }[];
}

interface ModalAnswerProps extends AnswerProps {
  closeModal: () => void;
}

export default function ModalAnswer({ closeModal }: ModalAnswerProps) {
  return <div>the answer is ...</div>;
}
