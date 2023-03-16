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

type HorizontalLineProps = {
  y: number;
  canvasHeight: number;
}
class HorizontalLine {
  private y: number;
  private canvasHeight: number;
  private canvasHalf: number;

  constructor({ y, canvasHeight }: HorizontalLineProps) {
    this.y = y;
    this.canvasHeight = canvasHeight;
    this.canvasHalf = canvasHeight / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const from = { x: 0, y: this.y };
    const to = { x: ctx.canvas.width, y: this.y };
    drawLine(ctx, from, to);
  }

  update() {
    const { canvasHalf } = this;
    if (this.canvasHeight < this.y) {
      this.y = canvasHalf;
      return;
    }
    // based on the distance from the center of the canvas, the acceleration
    // of the line is reduced
    const distanceFromCenter = Math.abs(canvasHalf - this.y) + 1;
    const acceleration = (distanceFromCenter / canvasHalf) * 3;
    this.y += acceleration;
  }
}
const lineCount = 10;

let horizontalLines: HorizontalLine[] = [];

const onResize = () => {
  horizontalLines = [];
};
if (typeof window !== 'undefined') {
  window.addEventListener('resize', onResize);
}

export const synthwaveLandscape = (
  ctx: CanvasRenderingContext2D,
  frameCount: number
) => {
  const height = ctx.canvas.height;
  const width = ctx.canvas.width;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'black';

  const halfHeight = height / 2;
  
  if (horizontalLines.length === 0) {
    horizontalLines = Array.from({ length: lineCount }, (_, i) => {
      const hypotenuse = Math.hypot(halfHeight, halfHeight);
      const spacing = (hypotenuse / lineCount) * (7 / (i + 2));
      const y =  (height - (i * spacing));
      console.log(y);
      return new HorizontalLine({ y, canvasHeight: height });
    });
  }

  horizontalLines.forEach((line) => {
    line.draw(ctx);
    line.update();
  });
};
