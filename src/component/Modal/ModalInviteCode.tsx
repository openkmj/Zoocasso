import React, { useState } from "react";
import Icon, { IconType } from "../Icon";
import styles from "./index.module.css";

export interface InviteCodeProps {
  callback: (code: string) => void;
}

interface ModalInviteCodeProps {
  props: InviteCodeProps;
  closeModal: () => void;
}

export default function ModalInviteCode({
  props: { callback },
  closeModal,
}: ModalInviteCodeProps) {
  const [code, setCode] = useState("");
  const handleEnterRoom = () => {
    if (!code || !code.trim()) return;
    callback(code);
    closeModal();
  };
  return (
    <div className={styles.modalLayout}>
      <div
        className={styles.modalClose}
        onClick={() => {
          closeModal();
        }}
      >
        <Icon type={IconType.CLOSE} width={24} height={24} color="#fff" />
      </div>
      <div className={styles.modalTitle}>If you have code?</div>
      <div className={`${styles.modalText} title`}>Enter the code</div>
      <input
        placeholder="Type your code"
        maxLength={6}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <button onClick={handleEnterRoom}>Enter the room</button>
    </div>
  );
}
