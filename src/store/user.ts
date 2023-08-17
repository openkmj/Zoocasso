import { create } from "zustand";
import { MemberInRoom } from "../class/game";

interface UserState extends MemberInRoom {
  setUser: (user: MemberInRoom) => void;
  setId: (id: string) => void;
}

const useUserStore = create<UserState>()((set, get) => ({
  id: "",
  name: "anonymous",
  isManager: false,
  setUser: (user: MemberInRoom) => {
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
