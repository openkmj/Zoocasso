import React from "react";
import Slider, { Settings } from "react-slick";
import Icon, { IconType } from "../Icon";
import styles from "./index.module.css";

interface CustomSliderProps extends Settings {
  sliderRef?: any;
  type: "normal" | "full" | "200";
  children: any;
}

const CustomSlider = (props: CustomSliderProps) => {
  const { sliderRef, type, children, ...p } = props;

  return (
    <Slider
      {...p}
      ref={sliderRef}
      className={
        type === "normal"
          ? styles.slick
          : type === "full"
          ? styles.longSlick
          : styles.slick200
      }
      nextArrow={
        <div>
          {type === "200" ? (
            <Icon
              type={IconType.RIGHT_ARROW}
              width={20}
              height={24}
              color="#fff"
            />
          ) : (
            <Icon
              type={IconType.RIGHT_ARROW}
              width={8}
              height={10}
              color="#fff"
            />
          )}
        </div>
      }
      prevArrow={
        <div>
          {type === "200" ? (
            <Icon
              type={IconType.LEFT_ARROW}
              width={20}
              height={24}
              color="#fff"
            />
          ) : (
            <Icon
              type={IconType.LEFT_ARROW}
              width={8}
              height={10}
              color="#fff"
            />
          )}
        </div>
      }
    >
      {children}
    </Slider>
  );
};

export default CustomSlider;
