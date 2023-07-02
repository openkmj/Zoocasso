export interface Config extends RoomConfig, GameConfig {}

export interface RoomConfig {
  isPrivate: boolean;
  language: AvailableLangugae;
}

export interface GameConfig {
  drawTime: number;
  round: number;
}

export const GAME_STATUS = {
  PENDING: 0, // 로비 대기
  SELECTING_WORD: 1, // 단어 선택 중
  DRAWING: 2, // 그림 그리는 중
};
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export type AvailableLangugae = "ko" | "en";

export interface Member {
  id: string;
  name: string;
  isManager?: boolean;
  score?: number;
}
