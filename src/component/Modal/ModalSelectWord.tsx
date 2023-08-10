import React from "react";

export interface SelectWordProps {
  words: string[];
  callback: (word: string) => void;
}

interface ModalSelectWordProps extends SelectWordProps {
  closeModal: () => void;
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
            // closeModal();
          }}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
