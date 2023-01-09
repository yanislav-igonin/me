type LineProps ={
  y: number;
  canvasHeight: number;
}
class Line {
  private y: number;
  private canvasHeight: number;

  constructor({ y, canvasHeight }: LineProps) {
    this.y = y;
    this.canvasHeight = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineTo(0, this.y);
  }

  update() {
    const canvasHalf = this.canvasHeight / 2;
    if (canvasHalf < this.y - 10) {
      this.y = 0;
      return;
    }
    this.y -= 10;
  }
}

export const synthwaveLandscape = (ctx: CanvasRenderingContext2D, frameCount: number) => {
  const height = ctx.canvas.height;
  let width = ctx.canvas.width;
  // line from bottom to center
  ctx.beginPath();
  ctx.moveTo(0, height);

  while (true) {

  }
};
