import React from "react";

export interface InviteCodeProps {
  callback: () => void;
}

interface ModalInviteCodeProps {
  props: InviteCodeProps;
  closeModal: () => void;
}

export default function ModalInviteCode({
  props: { callback },
  closeModal,
}: ModalInviteCodeProps) {
  const handleEnterRoom = () => {
    callback();
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
