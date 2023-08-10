import React from "react";

export interface GameResultProps {
  ranking: {
    name: string;
    score: number;
  }[];
}

interface ModalGameResultProps extends GameResultProps {
  closeModal: () => void;
}

export default function ModalGameResult({
  closeModal,
  ranking,
}: ModalGameResultProps) {
  return <div>game result</div>;
}
