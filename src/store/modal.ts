import { create } from "zustand";

interface ModalType {
  type: string;
  props: any;
}

interface ModalState {
  modals: ModalType[];
  openModal: (type: string, props: any) => void;
  closeModal: (type: string) => void;
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
