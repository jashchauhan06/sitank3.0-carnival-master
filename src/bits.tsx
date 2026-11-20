import { useEffect, useRef } from 'react';

interface Flake { x: number; y: number; r: number; v: number; a: number }

export function NumericText({ value }: { value: string }) {
  return <>{value.split(/(\d+(?:[.,]\d+)*)/g).map((part, i) => /^\d/.test(part) ? <span className="numeric" key={i}>{part}</span> : part)}</>;
}

export const Corners = () => ['tl', 'tr', 'bl', 'br'].map(c => <span key={c} className={'corner ' + c} />);

export function SecHead({ eyebrow, title, banner }: { eyebrow?: string; title: string; banner?: boolean }) {
  return (
    <div className="sec-head">
      {eyebrow && <p className="eyebrow"><NumericText value={eyebrow} /></p>}
      {banner ? <div className="banner"><h2><NumericText value={title} /></h2></div> : <><h2><NumericText value={title} /></h2><div className="rule"><i /></div></>}
    </div>
  );
}

const ICONS = {
  star: <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />,
  people: <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3 19c.8-3 2.8-4.5 5-4.5s4.2 1.5 5 4.5M11 19c.8-3 2.8-4.5 5-4.5s4.2 1.5 5 4.5" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
  megaphone: <path d="M4 10v4l11 5V5L4 10zM15 9a3 3 0 0 1 0 6M7 14.5l1.5 5h2.5l-1.4-4.3" />,
  bars: <path d="M5 20V10M10 20V6M15 20v-8M20 20V4" />,
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />,
};
export type IconName = keyof typeof ICONS;
export const Icon = ({ name }: { name: IconName }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{ICONS[name]}</svg>;

// Falling snow on one fixed canvas; off under reduced motion and while the tab is hidden.
export function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current;
    const x = cv?.getContext('2d');
    if (!cv || !x) return;
    let W = 0, H = 0, flakes: Flake[] = [], raf = 0;
    const size = () => {
      W = cv.width = innerWidth; H = cv.height = innerHeight;
      flakes = Array.from({ length: Math.round(W * H / 16000) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: .6 + Math.random() * 1.8, v: .3 + Math.random() * .8, a: Math.random() * 6 }));
    };
    const draw = () => {
      x.clearRect(0, 0, W, H); x.fillStyle = 'rgba(246,236,222,.75)';
      for (const p of flakes) {
        p.y += p.v; p.a += .01; p.x += Math.sin(p.a) * .35;
        if (p.y > H + 4) { p.y = -4; p.x = Math.random() * W; }
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    size(); draw();
    addEventListener('resize', size);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); };
  }, []);
  return <canvas id="snow" ref={ref} aria-hidden="true" />;
}
