import React from "react";
import { Member } from "../../class/game";
import styles from "./index.module.css";

export default function MemberList({ memberList }: { memberList: Member[] }) {
  return (
    <div className={styles.memberList}>
      <div>
        <div>score</div>
      </div>
      <div>member list</div>
      {memberList.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  );
}
