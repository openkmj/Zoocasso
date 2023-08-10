import React from "react";

export interface WaitWordProps {
  player: string;
}

interface ModalWaitWordProps extends WaitWordProps {
  closeModal: () => void;
}

export default function ModalWaitWord({
  player,
  closeModal,
}: ModalWaitWordProps) {
  return (
    <div>
      <div>It's {player} turn!</div>
      <div>Please wait</div>
      <div>for choosing a word</div>
    </div>
  );
}
