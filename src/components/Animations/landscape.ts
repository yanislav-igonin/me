type Point = {
  x: number;
  y: number;
};

const drawLine = (ctx: CanvasRenderingContext2D, from: Point, to: Point) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
};

type LineProps ={
  y: number;
  canvasHeight: number;
}
class Line {
  private y: number;
  private canvasHeight: number;

  constructor({ y, canvasHeight }: LineProps) {
    this.y = y;
    this.canvasHeight = canvasHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const from = { x: 0, y: this.y };
    const to = { x: ctx.canvas.width, y: this.y };
    drawLine(ctx, from, to);
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

const lineCount = 40;

export const synthwaveLandscape = (ctx: CanvasRenderingContext2D, frameCount: number) => {
  const height = ctx.canvas.height;
  const width = ctx.canvas.width;
  
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'black';

  const mod = frameCount % lineCount;

  const lines = Array.from({ length: lineCount }, (_, i) => {
    const y = i * (height / lineCount) + mod;
    return new Line({ y, canvasHeight: height });
  });

  lines.forEach((line) => {
    line.draw(ctx);
    line.update();
  });
};
