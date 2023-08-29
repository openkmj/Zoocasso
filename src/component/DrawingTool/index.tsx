import React from "react";
import styles from "./index.module.css";

const colorSet = [];

interface DrawingToolProps {
  canvasManager: any;
}

const DrawingTool = ({ canvasManager }: DrawingToolProps) => {
  return (
    <div className={styles.drawingTool}>
      <div></div>
      <div>{colorSet.map((i) => {})}</div>
    </div>
  );
};

export default DrawingTool;
