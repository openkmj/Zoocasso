export interface ServerRoomPreview {
  id: string;
  member_count: number;
  max_member_count: number;
  is_private: boolean;
}

export class RoomPreview {
  id: string;
  memberCount: number;
  maxMemberCount: number;
  isPrivate: boolean;
  constructor(params: ServerRoomPreview) {
    this.id = params.id ?? "";
    this.memberCount = params.member_count ?? 0;
    this.maxMemberCount = params.max_member_count ?? 0;
    this.isPrivate = params.is_private ?? false;
  }
}
