import React, { useCallback, useState } from "react";
import ReactModal from "react-modal";
import useModalStore from "../../store/modal";
import ModalAnswer from "./ModalAnswer";
import ModalGameResult from "./ModalGameResult";
import ModalInviteCode from "./ModalInviteCode";
import ModalSelectWord from "./ModalSelectWord";
import ModalWaitWord from "./ModalWaitWord";
import styles from "./index.module.css";

export default function Modal() {
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);
  const [isClosing, setIsClosing] = useState<Map<string, boolean>>(new Map());

  const close = useCallback((type: string) => {
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
            className={styles.modal}
            //   overlayClassName={
            //     closing ? `${styles.overlay} ${styles.closing}` : styles.overlay
            //   }
            //   className={
            //     closing ? `${styles.content} ${styles.closing}` : styles.content
            //   }
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            onRequestClose={() => {
              close(type);
            }}
          >
            <ModalContents
              type={type}
              closeModal={() => close(type)}
              {...props}
            />
          </ReactModal>
        );
      })}
    </>
  );
}

const ModalContents = ({
  type,
  closeModal,
  ...props
}: {
  type: string;
  closeModal: () => void;
}) => {
  switch (type) {
    case "SELECT_WORD":
      return <ModalSelectWord closeModal={closeModal} {...props} />;
    case "WAIT_WORD":
      return <ModalWaitWord closeModal={closeModal} {...props} />;
    case "ANSWER":
      return <ModalAnswer closeModal={closeModal} {...props} />;
    case "GAME_RESULT":
      return <ModalGameResult closeModal={closeModal} {...props} />;
    case "INVITE_CODE":
      return <ModalInviteCode closeModal={closeModal} {...props} />;
    default:
      return null;
  }
};
