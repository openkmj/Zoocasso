import { create } from "zustand";
import { Member } from "../class/game";

interface GameState {
  user: Member;
  setUser: (user: Member) => void;
}

const useGameStore = create<GameState>()((set) => ({
  user: {
    id: "",
    name: "anonymous",
  },
  setUser: (user: Member) => {
    set({
      user,
    });
  },
}));

export default useGameStore;
