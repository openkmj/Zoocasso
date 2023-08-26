import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Lobby.module.css";
import api from "../api";
import Logo from "../asset/Logo.png";
import Capy from "../asset/img/capy.png";
import Monkey from "../asset/img/monkey.png";
import { AvailableLangugae } from "../class/game";
import { RoomPreview } from "../class/room";
import CustomSlider from "../component/Slider";
import useModalStore from "../store/modal";
import useUserStore from "../store/user";
import { createRandomName } from "../util/random";

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
  const [character, setCharacter] = useState(0);
  const { setUser } = useUserStore();
  const { openModal } = useModalStore();

  const onClickJoinPrivate = async () => {
    if (!name || !roomPreview) return;
    const roomId = await api.joinRoom(name, roomPreview.id);
    setUser({ id: "", name, character, isManager: false }); // TODO: Set isManager
    setRoom(roomId);
  };
  const onClickJoinPublic = async () => {
    alert("currently not available");
    // if (!name) {
    //   const _name = createRandomName();
    //   setName(_name);
    //   const roomId = await api.joinRoom(_name);
    //   setUser({ id: "", name: _name, isManager: false });
    //   setRoom(roomId);
    // } else {
    //   const roomId = await api.joinRoom(name);
    //   setUser({ id: "", name, isManager: false });
    //   setRoom(roomId);
    // }
  };
  const onClickCreatePrivate = async () => {
    if (name) {
      const roomId = await api.createRoom(name, {
        isPrivate: true,
        language: language,
      });
      setUser({ id: "", name, character, isManager: true });
      setRoom(roomId);
    } else {
      const _name = createRandomName();
      setName(_name);
      const roomId = await api.createRoom(_name, {
        isPrivate: true,
        language: language,
      });
      setUser({ id: "", name: _name, character, isManager: true });
      setRoom(roomId);
    }
  };

  const openInviteCodeModal = () => {
    openModal("INVITE_CODE", {
      callback: (code) => {
        navigate(`/${code}`);
      },
    });
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
            <CustomSlider
              type="200"
              className={styles.slick}
              afterChange={(idx) => {
                setCharacter(idx);
              }}
            >
              <img
                className={styles.characterImage}
                src={Capy}
                alt="capybara"
              />
              <img
                className={styles.characterImage}
                src={Monkey}
                alt="monkey"
              />
            </CustomSlider>
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
