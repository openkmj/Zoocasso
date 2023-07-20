import React from "react";

interface ModalSelectWordProps {
  closeModal: () => void;
  words?: string[];
  callback?: (word: string) => void;
}

export default function ModalSelectWord({
  closeModal,
  words,
  callback,
}: ModalSelectWordProps) {
  if (!words || !callback) return <></>;
  return (
    <div>
      {words.map((i) => (
        <button
          key={i}
          onClick={() => {
            callback(i);
            closeModal();
          }}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
