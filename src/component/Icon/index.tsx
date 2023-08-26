import React from "react";
import { ReactComponent as ClockIcon } from "../../asset/icon/alram-clock.svg";
import { ReactComponent as ArrowIcon } from "../../asset/icon/arrow.svg";
import { ReactComponent as CloseIcon } from "../../asset/icon/close.svg";
import { ReactComponent as SendIcon } from "../../asset/icon/send.svg";
import { ReactComponent as ShareIcon } from "../../asset/icon/share.svg";
import { ReactComponent as SkipIcon } from "../../asset/icon/skip.svg";

export enum IconType {
  SKIP,
  SHARE,
  CLOSE,
  LEFT_ARROW,
  RIGHT_ARROW,
  SEND,
  CLOCK,
}

interface IconProps {
  type: IconType;
  width: number;
  height: number;
  color: string;
}

const Icon = ({ type, width, height, color }: IconProps) => {
  switch (type) {
    case IconType.SKIP:
      return <SkipIcon />;
    case IconType.SHARE:
      return <ShareIcon />;
    case IconType.CLOSE:
      return <CloseIcon width={width} height={height} fill={color} />;
    case IconType.LEFT_ARROW:
      return <ArrowIcon width={width} height={height} fill={color} />;
    case IconType.RIGHT_ARROW:
      return (
        <ArrowIcon
          width={width}
          height={height}
          fill={color}
          transform="scale(-1,1)"
        />
      );
    case IconType.SEND:
      return <SendIcon width={width} height={height} fill={color} />;
    case IconType.CLOCK:
      return <ClockIcon width={width} height={height} fill={color} />;
  }
};

export default Icon;
