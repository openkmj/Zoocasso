import React from "react";
import { Member } from "../class/game";

export default function MemberList({ memberList }: { memberList: Member[] }) {
  return (
    <div>
      <div>member list</div>
      {memberList.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  );
}
