import { create } from "zustand";
import { Member } from "../class/game";

interface GameState {
  user: Member;
  setUser: (user: Member) => void;
  setId: (id: string) => void;
}

const useGameStore = create<GameState>()((set, get) => ({
  user: {
    id: "",
    name: "anonymous",
  },
  setUser: (user: Member) => {
    set({
      user,
    });
  },
  setId: (id: string) => {
    set({
      user: { ...get().user, id },
    });
  },
}));

export default useGameStore;
