const WIDTH = 128;
const HEIGHT = 128;

let timer: ReturnType<typeof setTimeout> | null = null;

export default class CanvasManager {
  private bitMap: ArrayBuffer;
  private canvas: HTMLCanvasElement;
  private ctx: any;
  private handleCanvasUpdated: (data: ArrayBuffer) => void;
  constructor(
    canvas: HTMLCanvasElement,
    handleCanvasUpdated: (data: ArrayBuffer) => void
  ) {
    this.bitMap = new ArrayBuffer((WIDTH * HEIGHT) / 2);
    console.log(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    console.log(this.ctx);
    this.canvas.onmousemove = (e: MouseEvent) => {
      this.draw(e);
    };

    this.handleCanvasUpdated = handleCanvasUpdated;
  }
  private draw(e: MouseEvent) {
    // console.log(e);
    if (e.buttons !== 1) return;
    // const ctx = this.canvas.getContext("2d");
    if (!this.ctx) return;
    this.ctx.imageSmoothingEnabled = false;
    const rect = this.canvas.getBoundingClientRect();

    const x = Math.floor((e.offsetX * WIDTH) / rect.width);
    const y = Math.floor((e.offsetY * HEIGHT) / rect.height);

    const img = new Uint8Array(this.bitMap);

    const dataIndex = (y * 128 + x) / 2;

    if (x % 2 === 0) {
      img[dataIndex] = 1 | (img[dataIndex] & 0x0f);
    } else {
      img[dataIndex] = (img[dataIndex] & 0xf0) | 1;
    }

    this.syncCanvas(img.buffer);

    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      this.handleCanvasUpdated(this.bitMap);
      // gameManagerRef.current.emitEvent({
      //   roomId: room,
      //   type: C2SEventType.DRAW,
      //   payload: {
      //     data: b,
      //   },
      // });
    }, 1000);
  }

  syncCanvas(bitMap: ArrayBuffer) {
    console.log("sync canvas");
    console.log(bitMap.byteLength);
    if (bitMap.byteLength !== this.bitMap.byteLength) return;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    this.bitMap = bitMap;
    const view = new Uint8Array(bitMap);
    ctx.imageSmoothingEnabled = false;

    const img = ctx.createImageData(WIDTH, HEIGHT);
    for (let i = 0; i < view.length; i++) {
      const data = view[i];
      const p1 = data >> 4;
      const p2 = data & 0x0f;
      const c1 = palette[p1];
      const c2 = palette[p2];

      img.data[i * 8] = c1[0];
      img.data[i * 8 + 1] = c1[1];
      img.data[i * 8 + 2] = c1[2];
      img.data[i * 8 + 3] = 255;

      img.data[i * 8 + 4] = c2[0];
      img.data[i * 8 + 5] = c2[1];
      img.data[i * 8 + 6] = c2[2];
      img.data[i * 8 + 7] = 255;
    }

    ctx.putImageData(img, 0, 0);
    console.log("success");
  }
}

const palette = [
  [0, 0, 0], // white
  [255, 255, 255], // black
  [200, 200, 200], // grey
  [255, 67, 67], // red
  [255, 135, 67], // orange
  [255, 225, 67], // yellow
  [138, 255, 67], // light green
  [63, 204, 51], // green
  [56, 100, 255], // blue
  [0, 45, 203], // dark blue
  [138, 67, 255], // purple
  [255, 67, 191], // pink
  [255, 67, 191], // pink
  [255, 67, 191], // pink
  [255, 67, 191], // pink
  [255, 67, 191], // pink
];
