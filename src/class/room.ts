import { AvailableLangugae } from "./game";

export interface ServerRoomPreview {
  id: string;
  member_count: number;
  max_member_count: number;
  is_private: boolean;
  language: AvailableLangugae;
}

export class RoomPreview {
  id: string;
  memberCount: number;
  maxMemberCount: number;
  isPrivate: boolean;
  language: AvailableLangugae;
  constructor(params: ServerRoomPreview) {
    this.id = params.id ?? "";
    this.memberCount = params.member_count ?? 0;
    this.maxMemberCount = params.max_member_count ?? 0;
    this.isPrivate = params.is_private ?? false;
    this.language = params.language ?? "en";
  }
}
