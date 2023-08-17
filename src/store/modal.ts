import { create } from "zustand";
import { AnswerProps } from "../component/Modal/ModalAnswer";
import { GameResultProps } from "../component/Modal/ModalGameResult";
import { InviteCodeProps } from "../component/Modal/ModalInviteCode";
import { SelectWordProps } from "../component/Modal/ModalSelectWord";
import { TurnResultProps } from "../component/Modal/ModalTurnResult";
import { WaitWordProps } from "../component/Modal/ModalWaitWord";

export type ModalProps =
  | SelectWordProps
  | WaitWordProps
  | AnswerProps
  | GameResultProps
  | TurnResultProps
  | InviteCodeProps;

export type ModalType =
  | "SELECT_WORD"
  | "ANSWER"
  | "GAME_RESULT"
  | "INVITE_CODE"
  | "TURN_RESULT"
  | "WAIT_WORD";

export type Modal = {
  type: ModalType;
  props: ModalProps;
};
interface ModalState {
  modals: Modal[];
  openModal: (type: ModalType, props: ModalProps) => void;
  closeModal: (type: ModalType) => void;
}

const useModalStore = create<ModalState>()((set, get) => ({
  modals: [],
  openModal: (type, props) => {
    // remove existing modal with same type (prevent key duplicate)
    const openModals = get().modals;
    for (let i = 0; i < openModals.length; i++) {
      if (openModals[i].type === type) {
        openModals.splice(i, 1);
      }
    }
    set(() => ({
      modals: [...openModals, { type, props }],
    }));
  },
  closeModal: (type) => {
    set(() => ({
      modals: get().modals.filter((item) => item.type !== type),
    }));
  },
}));

export default useModalStore;
