import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styles from "../Lobby.module.css";
import api from "../api";
import Logo from "../asset/Logo.png";
import Capy from "../asset/img/capy.png";
import { AvailableLangugae } from "../class/game";
import { RoomPreview } from "../class/room";
import useModalStore from "../store/modal";
import useUserStore from "../store/user";

export default function LobbyPage({
  setRoom,
  roomPreview,
}: {
  setRoom: (room: string) => void;
  roomPreview?: RoomPreview;
}) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [language, setLanguage] = useState<AvailableLangugae>(
    roomPreview ? roomPreview.language : "en"
  );
  const { setUser } = useUserStore();
  const { openModal } = useModalStore();

  const onClickJoinPrivate = async () => {
    if (!name || !roomPreview) return;
    const roomId = await api.joinRoom(name, roomPreview.id);
    setUser({ id: "", name, isManager: false }); // TODO: Set isManager
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
    setUser({ id: "", name, isManager: true });
    setRoom(roomId);
  };

  const openInviteCodeModal = () => {
    openModal("INVITE_CODE", {});
  };
  const handleBackToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    // openModal("WAIT_WORD", {
    //   player: "minjae",
    // });
  }, []);

  return (
    <div className={styles.lobby}>
      <div className={styles.top}>
        <img
          className={styles.logo}
          src={Logo}
          alt="logo"
          onClick={() => {
            location.href = "/";
          }}
        />
      </div>
      <div className={styles.contents}>
        <div className={styles.character}>
          <div className={styles.edit}>
            <Slider className={styles.slick}>
              <img src={Capy} alt="capybara" />
              <img src={Capy} alt="capybara" />
            </Slider>
          </div>
        </div>
        <div className={styles.name}>
          <input
            placeholder="Type your name"
            maxLength={12}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.language}>
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
          <div className={styles.roomInfo}>
            Members: {roomPreview.memberCount} / {roomPreview.maxMemberCount}
          </div>
        )}
        <div className={styles.actions}>
          {roomPreview ? (
            <>
              <button
                onClick={() => {
                  onClickJoinPrivate();
                }}
              >
                Private (Join)
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onClickJoinPublic();
                }}
              >
                Start
                <br />
                Game
              </button>
              <button
                onClick={() => {
                  onClickCreatePrivate();
                }}
              >
                Make
                <br />
                Room
              </button>
            </>
          )}
        </div>
        <div className={styles.inviteCode}>
          {roomPreview ? (
            <span className="text-button" onClick={handleBackToMain}>
              Back to main
            </span>
          ) : (
            <span className="text-button" onClick={openInviteCodeModal}>
              I have invitation code!
            </span>
          )}
        </div>
      </div>
      <div className={styles.help}>?</div>
    </div>
  );
}
