import { useEffect, useRef, useState } from 'react';
import { EVENT } from './content';
import { Corners, NumericText } from './bits';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
interface SceneLayer { cls: string; file: string; ext?: 'png' | 'webp'; depth: number }
const SCENE: readonly SceneLayer[] = [
  { cls: 'fairy glow', file: 'fairy', depth: 6 }, { cls: 'tent-grey', file: 'tent-grey', depth: 4 },
  { cls: 'tent-cream', file: 'tent-cream', depth: 7 }, { cls: 'wheel', file: 'wheel-full', ext: 'png', depth: 9 },
  { cls: 'bigtop', file: 'bigtop', depth: 12 }, { cls: 'stall', file: 'stall', depth: 16 },
  { cls: 'bush-l', file: 'bush-l', depth: 22 }, { cls: 'bush-r', file: 'bush-r', depth: 22 },
];
const pad = (n: number) => String(n).padStart(2, '0');

function Countdown() {
  const target = Date.parse(EVENT.startsAt);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const iv = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(iv); }, []);
  let s = Math.max(0, Math.floor((target - now) / 1000));
  if (s === 0) return <div className="countdown"><div><b>The carnival is live</b></div></div>;
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600); s %= 3600;
  const m = Math.floor(s / 60);
  return (
    <div className="countdown" aria-label="Time until the carnival opens">
      <div><b className="numeric">{d}</b><span>DAYS</span></div>
      <div><b className="numeric">{pad(h)}</b><span>HOURS</span></div>
      <div><b className="numeric">{pad(m)}</b><span>MINUTES</span></div>
      <div><b className="numeric">{pad(s % 60)}</b><span>SECONDS</span></div>
    </div>
  );
}

export default function Hero() {
  const layers = useRef<(HTMLImageElement | null)[]>([]);
  const nameParts = EVENT.name.match(/^(.*?)(\s+\d+(?:\.\d+)*)$/);
  useEffect(() => {
    if (reduce) return;
    let mx = 0, my = 0, raf = 0;
    const move = () => {
      raf = 0; const sy = Math.min(scrollY, 900);
      layers.current.forEach(l => { if (!l) return; const d = Number(l.dataset.d); l.style.transform = `translate(${(-mx * d).toFixed(1)}px, ${(-my * d * .5 - sy * d * .012).toFixed(1)}px)`; });
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(move); };
    const pm = (e: PointerEvent) => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; queue(); };
    addEventListener('pointermove', pm, { passive: true }); addEventListener('scroll', queue, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', pm); removeEventListener('scroll', queue); };
  }, []);

  return (
    <header className="hero gut" id="top">
      <video className="hero-video" aria-hidden="true" autoPlay={!reduce} muted loop playsInline preload={reduce ? 'none' : 'metadata'} poster="/art/field.webp">
        <source src="/art/bg.mp4" type="video/mp4" />
      </video>
      <div className="stars" />
      <img className="deco branch-l" src="/art/branch-l.webp" alt="" />
      <img className="deco branch-r" src="/art/branch-r.webp" alt="" />
      <img className="deco bulbs-l glow" src="/art/bulbs-l.webp" alt="" />
      <img className="deco bulbs-r glow slow" src="/art/bulbs-r.webp" alt="" />
      <div className="frame">
        <Corners />
        <div className="hero-copy">
          <p className="presents">{EVENT.presenter}<i>Presents</i></p>
          <div className="wordmark">
            <img src="/art/tent-top.webp" alt="" />
            <h1><span className="flake" aria-hidden="true">{'❄'}</span><span className="wordmark-title">{nameParts ? <>{nameParts[1]}<span className="wordmark-edition">{nameParts[2]}</span></> : EVENT.name}</span><span className="flake" aria-hidden="true">{'❄'}</span></h1>
          </div>
          <div className="ribbon"><span>{EVENT.ribbon}</span></div>
          <p className="tagline">{EVENT.tagline}</p>
        </div>
        <div className="scene" aria-hidden="true">
          <div className="field" />
          {SCENE.map((l, i) => <img key={l.file} ref={el => { layers.current[i] = el; }} className={l.cls} data-d={l.depth} src={`/art/${l.file}.${l.ext ?? 'webp'}`} alt="" />)}
        </div>
        <div className="ticket">
          <span className="it">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4M8 13h2M12 13h2M16 13h0M8 16.5h2M12 16.5h2" /></svg>
            <span className="numeric">4</span><sup>th</sup>{' – '}<span className="numeric">6</span><sup>th</sup>&nbsp;February, <span className="numeric">2027</span>
          </span>
          <span className="sep" aria-hidden="true" />
          <span className="it">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.8" r="2.4" /></svg>
            {EVENT.venue}
          </span>
        </div>
        <Countdown />
        <a className="cta hero-cta" href="#contact"><span>Pitch your startup</span></a>
      </div>
    </header>
  );
}
