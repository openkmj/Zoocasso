import React from "react";

export interface InviteCodeProps {}

interface ModalInviteCodeProps extends InviteCodeProps {
  closeModal: () => void;
}

export default function ModalInviteCode({ closeModal }: ModalInviteCodeProps) {
  const handleEnterRoom = () => {
    // do something
    closeModal();
  };
  return (
    <div>
      <div>If you have code?</div>
      <input placeholder="Type your code" />
      <button onClick={handleEnterRoom}>enter</button>
    </div>
  );
}
