import React from "react";

export interface GameResultProps {
  ranking: {
    name: string;
    score: number;
  }[];
}

interface ModalGameResultProps {
  props: GameResultProps;
  closeModal: () => void;
}

export default function ModalGameResult({
  props: { ranking },
  closeModal,
}: ModalGameResultProps) {
  return <div>game result</div>;
}
