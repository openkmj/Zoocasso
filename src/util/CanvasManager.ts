const WIDTH = 128;
const HEIGHT = 128;

let timer: ReturnType<typeof setTimeout> | null = null;

export default class CanvasManager {
  private bitMap: ArrayBuffer;
  private canvas: HTMLCanvasElement;
  private ctx: any;
  private handleCanvasUpdated: (data: ArrayBuffer) => void;
  private isDrawing = false;
  constructor(
    canvas: HTMLCanvasElement,
    handleCanvasUpdated: (data: ArrayBuffer) => void
  ) {
    this.bitMap = new ArrayBuffer((WIDTH * HEIGHT) / 2);
    console.log(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    console.log(this.ctx);

    canvas.addEventListener("touchstart", (e) => {
      this.startDrawing(e);
    });
    canvas.addEventListener("touchend", () => {
      this.endDrawing();
    });
    canvas.addEventListener("touchmove", (e) => {
      this.draw(e);
    });
    canvas.addEventListener("mousedown", (e) => {
      this.startDrawing(e);
    });
    canvas.addEventListener("mouseup", () => {
      this.endDrawing();
    });
    canvas.addEventListener("mousemove", (e) => {
      this.draw(e);
    });
    // this.canvas.onmousemove = (e: MouseEvent) => {
    //   this.draw(e, 10);
    // };

    this.handleCanvasUpdated = handleCanvasUpdated;
  }
  private startDrawing(e: MouseEvent | TouchEvent) {
    this.isDrawing = true;
    this.draw(e);
  }
  private endDrawing() {
    this.isDrawing = false;
  }
  private draw(e: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    let evt;
    if (e instanceof TouchEvent) {
      evt = e.touches[0];
    } else {
      evt = e;
    }
    const pixelSize = 1;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor(((evt.clientX - rect.x) * WIDTH) / rect.width);
    const y = Math.floor(((evt.clientY - rect.y) * WIDTH) / rect.height);

    console.log(x, y);
    this.ctx.fillStyle = "#333333";
    this.ctx.fillRect(
      Math.floor(x / pixelSize) * pixelSize,
      Math.floor(y / pixelSize) * pixelSize,
      pixelSize,
      pixelSize
    );
  }
  // private draw(e: MouseEvent, color: number) {
  //   if (color < 0 || color > 15) return;
  //   if (e.buttons !== 1) return;
  //   // const ctx = this.canvas.getContext("2d");
  //   if (!this.ctx) return;
  //   this.ctx.imageSmoothingEnabled = false;
  //   const rect = this.canvas.getBoundingClientRect();

  //   const x = Math.floor((e.offsetX * WIDTH) / rect.width);
  //   const y = Math.floor((e.offsetY * HEIGHT) / rect.height);

  //   const img = new Uint8Array(this.bitMap);
  //   const dataView = new DataView(img.buffer);

  //   const dataIndex = (y * 128 + x) / 2;

  //   if (x % 2 === 0) {
  //     dataView.setUint8(
  //       dataIndex,
  //       ((color << 4) | 0b00001111) &
  //         (dataView.getUint8(dataIndex) | 0b11110000)
  //     );
  //   } else {
  //     dataView.setUint8(
  //       dataIndex,
  //       (dataView.getUint8(dataIndex) | 0b00001111) & (color | 0b11110000)
  //     );
  //   }

  //   this.syncCanvas(img.buffer);

  //   if (timer) return;
  //   timer = setTimeout(() => {
  //     timer = null;
  //     this.handleCanvasUpdated(this.bitMap);
  //     // gameManagerRef.current.emitEvent({
  //     //   roomId: room,
  //     //   type: C2SEventType.DRAW,
  //     //   payload: {
  //     //     data: b,
  //     //   },
  //     // });
  //   }, 1000);
  // }

  clear() {
    this.bitMap = new ArrayBuffer((WIDTH * HEIGHT) / 2);
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  syncCanvas(bitMap: ArrayBuffer) {
    if (bitMap.byteLength !== this.bitMap.byteLength) return;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    this.bitMap = bitMap;
    const view = new Uint8Array(bitMap);
    ctx.imageSmoothingEnabled = false;

    const dataView = new DataView(view.buffer);

    const img = ctx.createImageData(WIDTH, HEIGHT);
    for (let i = 0; i < view.length; i++) {
      // const byte = dataView.getUint8(i);
      const p1 = dataView.getUint8(i) >> 4; // 0~15 사이의 값
      const p2 = dataView.getUint8(i) & 0b1111; // 0~15 사이의 값

      const c1 = palette[p1];
      const c2 = palette[p2];

      // if (p1 || p2) console.log(p1, p2);

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
  }
}

const palette = [
  [255, 255, 255], // white
  [0, 0, 0], // black
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
