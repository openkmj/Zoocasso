export const enum C2SEventType {
  JOIN = "JOIN",
  CHAT = "CHAT",
  UPDATE_SETTING = "UPDATE_SETTING",
  START = "START",
  SELECT_WORD = "SELECT_WORD",
  DRAW = "DRAW",
  KICK = "KICK",
  SKIP = "SKIP",
}

export type C2SEvent =
  | {
      roomId: string;
      type: C2SEventType.JOIN;
      payload: JoinPayload;
    }
  | {
      roomId: string;
      type: C2SEventType.CHAT;
      payload: ChatPayload;
    }
  | {
      roomId: string;
      type: C2SEventType.UPDATE_SETTING;
      payload: UpdateSettingPayload;
    }
  | {
      roomId: string;
      type: C2SEventType.START;
      payload: StartPayload;
    }
  | {
      roomId: string;
      type: C2SEventType.SELECT_WORD;
      payload: SelectWordPayload;
    }
  | {
      roomId: string;
      type: C2SEventType.KICK;
      payload: KickPayload;
    }
  | {
      roomId: string;
      type: C2SEventType.DRAW;
      payload: any;
    };

export type JoinPayload = {
  roomId: string;
  member: Member;
};
export type ChatPayload = {
  type: "USR";
  member: Member;
  text: string;
};
export type UpdateSettingPayload = {
  config: RoomConfig;
};
export type StartPayload = {
  //
};
export type SelectWordPayload = {
  word: string;
};
export type KickPayload = {
  member: Member;
};

export const enum S2CEventType {
  CHATTING_UPDATED = "CHATTING_UPDATED",
  MEMBER_UPDATED = "MEMBER_UPDATED",
  STATUS_UPDATED = "STATUS_UPDATED",
  SETTING_UPDATED = "SETTING_UPDATED",
  CANVAS_UPDATED = "CANVAS_UPDATED",
}

export type S2CEvent =
  | {
      roomId: string;
      type: S2CEventType.CHATTING_UPDATED;
      payload: ChattingUpdatedPayload;
    }
  | {
      roomId: string;
      type: S2CEventType.MEMBER_UPDATED;
      payload: MemberUpdatedPayload;
    }
  | {
      roomId: string;
      type: S2CEventType.STATUS_UPDATED;
      payload: StatusUpdatedPayload;
    }
  | {
      roomId: string;
      type: S2CEventType.SETTING_UPDATED;
      payload: SettingUpdatedPayload;
    };

export type ChattingUpdatedPayload =
  | {
      type: "SYS";
      text: string;
    }
  | {
      type: "USR";
      member: Member;
      text: string;
    };
export type MemberUpdatedPayload = {
  memberList: Member[];
};
export type StatusUpdatedPayload = {
  status: GameStatus;
  words?: string[];
};
export type SettingUpdatedPayload = {
  config: RoomConfig;
};

export interface RoomConfig extends GameConfig {
  isPrivate: boolean;
  language: AvailableLangugae;
}

export interface GameConfig {
  drawTime: number;
  round: number;
}

export const enum GAME_STATUS {
  PENDING = "PENDING", // 로비 대기
  SELECTING_WORD = "SELECTING_WORD", // 단어 선택 중
  DRAWING = "DRAWING", // 그림 그리는 중
}

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export type AvailableLangugae = "ko" | "en";

export interface Member {
  id: string;
  name: string;
  isManager?: boolean;
  score?: number;
}
