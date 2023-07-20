import React, { useState } from "react";
import Logo from "../asset/img/logo.png";
import Capy from "../asset/img/capy.png";
import api from "../api";
import { AvailableLangugae } from "../class/game";
import { RoomPreview } from "../class/room";
import useGameStore from "../store";

export default function LobbyPage({
  setRoom,
  roomPreview,
}: {
  setRoom: (room: string) => void;
  roomPreview?: RoomPreview;
}) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<AvailableLangugae>(
    roomPreview ? roomPreview.language : "en"
  );
  const { setUser } = useGameStore();

  const onClickJoinPrivate = async () => {
    if (!name || !roomPreview) return;
    const roomId = await api.joinRoom(name, roomPreview.id);
    setUser({ id: "", name });
    setRoom(roomId);
  };
  const onClickJoinPublic = async () => {
    if (!name) return;
    const roomId = await api.joinRoom(name);
    setUser({ id: "", name });
    setRoom(roomId);
  };
  const onClickCreatePrivate = async () => {
    if (!name) return;
    const roomId = await api.createRoom(name, {
      isPrivate: true,
      language: language,
    });
    setUser({ id: "", name });
    setRoom(roomId);
  };
  return (
    <div className="main">
      <div className="top">
        <img
          id="logo"
          src={Logo}
          alt="logo"
          onClick={() => {
            location.href = "/";
          }}
        />
      </div>
      <div className="contents">
        <div className="character">
          <div className="edit">
            <img src={Capy} alt="capybara" />
          </div>
        </div>
        <div className="name">
          <input
            placeholder="Type your name"
            maxLength={12}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="language">
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value as AvailableLangugae);
            }}
            disabled={!!roomPreview}
          >
            <option value="ko">Korean</option>
            <option value="en">English</option>
          </select>
        </div>
        {roomPreview && (
          <div className="room-info">
            Members: {roomPreview.memberCount} / {roomPreview.maxMemberCount}
          </div>
        )}
        <div className="actions">
          {roomPreview ? (
            <>
              <button
                onClick={() => {
                  onClickJoinPrivate();
                }}
              >
                Private(Join)
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onClickJoinPublic();
                }}
              >
                Public(Join)
              </button>
              <button
                onClick={() => {
                  onClickCreatePrivate();
                }}
              >
                Private(Host)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
