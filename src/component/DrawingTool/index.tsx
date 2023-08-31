import React from "react";
import { colorSet } from "../../util/color";
import styles from "./index.module.css";

interface DrawingToolProps {
  canvasManager: any;
}

const DrawingTool = ({ canvasManager }: DrawingToolProps) => {
  return (
    <div className={styles.drawingTool}>
      <div></div>
      <div>
        {colorSet.map((i) => {
          return <div>{i.hex}</div>;
        })}
      </div>
    </div>
  );
};

export default DrawingTool;
