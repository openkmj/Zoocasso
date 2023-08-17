import React, { useCallback, useState } from "react";
import ReactModal from "react-modal";
import useModalStore, { Modal, ModalType } from "../../store/modal";
import ModalAnswer, { AnswerProps } from "./ModalAnswer";
import ModalGameResult, { GameResultProps } from "./ModalGameResult";
import ModalInviteCode, { InviteCodeProps } from "./ModalInviteCode";
import ModalSelectWord, { SelectWordProps } from "./ModalSelectWord";
import ModalTurnResult, { TurnResultProps } from "./ModalTurnResult";
import ModalWaitWord, { WaitWordProps } from "./ModalWaitWord";
import styles from "./index.module.css";

export default function Modal() {
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);
  const [isClosing, setIsClosing] = useState<Map<ModalType, boolean>>(
    new Map()
  );

  const close = useCallback((type: ModalType) => {
    setIsClosing((cur) => new Map(cur.set(type, true)));
    setTimeout(() => {
      closeModal(type);
      setIsClosing((cur) => new Map(cur.set(type, false)));
    }, 500);
  }, []);
  return (
    <>
      {modals.map((modal) => {
        const { type, props } = modal;
        const closing = isClosing.get(type);
        return (
          <ReactModal
            key={type}
            isOpen={true}
            className={
              closing ? `${styles.modal} ${styles.closing}` : styles.modal
            }
            overlayClassName={
              closing ? `${styles.overlay} ${styles.closing}` : styles.overlay
            }
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            onRequestClose={() => {
              close(type);
            }}
          >
            <ModalContents
              type={type}
              closeModal={() => close(type)}
              props={props}
            />
          </ReactModal>
        );
      })}
    </>
  );
}

interface ModalContentsProps extends Modal {
  closeModal: () => void;
}

const ModalContents = ({ type, closeModal, props }: ModalContentsProps) => {
  switch (type) {
    case "SELECT_WORD":
      return (
        <ModalSelectWord
          closeModal={closeModal}
          props={props as SelectWordProps}
        />
      );
    case "WAIT_WORD":
      return (
        <ModalWaitWord closeModal={closeModal} props={props as WaitWordProps} />
      );
    case "ANSWER":
      return (
        <ModalAnswer closeModal={closeModal} props={props as AnswerProps} />
      );
    case "GAME_RESULT":
      return (
        <ModalGameResult
          closeModal={closeModal}
          props={props as GameResultProps}
        />
      );
    case "TURN_RESULT":
      return (
        <ModalTurnResult
          closeModal={closeModal}
          props={props as TurnResultProps}
        />
      );
    case "INVITE_CODE":
      return (
        <ModalInviteCode
          closeModal={closeModal}
          props={props as InviteCodeProps}
        />
      );
    default:
      return null;
  }
};
