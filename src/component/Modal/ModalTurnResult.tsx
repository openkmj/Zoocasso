import React from "react";

export interface TurnResultProps {
  ranking: {
    name: string;
    score: number;
  }[];
}

interface ModalTurnResultProps {
  props: TurnResultProps;
  closeModal: () => void;
}

export default function ModalTurnResult({
  props: { ranking },
  closeModal,
}: ModalTurnResultProps) {
  return <div>turn result</div>;
}
