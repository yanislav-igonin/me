import { useRef, useEffect, type DetailedHTMLProps, type CanvasHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
  & {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  mouseMove?: (e: MouseEvent) => void,
};

export const Canvas = ({ draw, mouseMove, ...props }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let lastTime = 0;
  // delta time counter
  let timer = 0;
  // 60 fps
  const interval = 1000 / 60;

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current as HTMLCanvasElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (!mouseMove) return;
    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [mouseMove]);


  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
    let frameCount = 0;
    let animationFrameId: number;

    // Our draw came here
    const render = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      if (timer > interval) {
        frameCount++;
        draw(context, frameCount);
        timer = 0;
      } else {
        timer += deltaTime;
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  return <canvas ref={canvasRef} {...props} />;
};
