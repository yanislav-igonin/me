import s from './RetrowaveSun.module.css';

const linesCount = 35;
const lines = Array.from({ length: linesCount }, (_, i) => i + 1);

export const RetrowaveSun = () => <div className={s.sun}>
  <div className={s.lines}>
    {lines.map((line) => <div key={line} className={s.line} />)}
  </div>
</div>;
