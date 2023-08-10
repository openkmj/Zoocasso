import { create } from "zustand";
import { Member } from "../class/game";

interface UserState extends Member {
  setUser: (user: Member) => void;
  setId: (id: string) => void;
}

const useUserStore = create<UserState>()((set, get) => ({
  id: "",
  name: "anonymous",
  isManager: false,
  setUser: (user: Member) => {
    set({
      id: user.id,
      name: user.name,
      isManager: !!user.isManager,
    });
  },
  setId: (id: string) => {
    set({
      id,
    });
  },
}));

export default useUserStore;
