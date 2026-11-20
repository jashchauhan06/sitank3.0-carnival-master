import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Hero from './Hero';
import { Corners, SecHead, Icon, Snow, NumericText } from './bits';
import { EVENT, NAV, ABOUT, PITCH, FLOW, WHY, SPONSOR_INTRO, BENEFITS, TITLE_TIERS, GALLERY, CONTACTS } from './content';

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

function WinterScrollbar() {
  const [metrics, setMetrics] = useState({ top: 0, height: 48, scroll: 0, maxScroll: 0 });
  const dragOffset = useRef(0);

  useEffect(() => {
    const update = () => {
      const viewport = window.innerHeight;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport);
      const height = Math.min(viewport, Math.max(42, viewport * viewport / Math.max(viewport, document.documentElement.scrollHeight)));
      const maxTop = Math.max(0, viewport - height);
      setMetrics({ top: maxScroll ? window.scrollY / maxScroll * maxTop : 0, height, scroll: window.scrollY, maxScroll });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, []);

  const dragTo = (clientY: number) => {
    const maxTop = Math.max(1, window.innerHeight - metrics.height);
    const top = Math.min(maxTop, Math.max(0, clientY - dragOffset.current));
    window.scrollTo(0, top / maxTop * metrics.maxScroll);
  };

  return <div
    className="winter-scroll-thumb"
    role="scrollbar"
    aria-label="Page scroll"
    aria-controls="root"
    aria-orientation="vertical"
    aria-valuemin={0}
    aria-valuemax={Math.round(metrics.maxScroll)}
    aria-valuenow={Math.round(metrics.scroll)}
    tabIndex={0}
    style={{ top: metrics.top, height: metrics.height }}
    onPointerDown={event => {
      dragOffset.current = event.clientY - event.currentTarget.getBoundingClientRect().top;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add('is-dragging');
    }}
    onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) dragTo(event.clientY); }}
    onPointerUp={event => { event.currentTarget.releasePointerCapture(event.pointerId); event.currentTarget.classList.remove('is-dragging'); }}
    onKeyDown={event => {
      const step = event.key === 'PageDown' || event.key === 'PageUp' ? window.innerHeight * .9 : 80;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') window.scrollBy({ top: step, behavior: 'smooth' });
      else if (event.key === 'ArrowUp' || event.key === 'PageUp') window.scrollBy({ top: -step, behavior: 'smooth' });
      else if (event.key === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else if (event.key === 'End') window.scrollTo({ top: metrics.maxScroll, behavior: 'smooth' });
      else return;
      event.preventDefault();
    }}
  />;
}

function CopyButton({ value }: { value: string }) {
  const [label, setLabel] = useState('Copy');
  const flash = (t: string) => { setLabel(t); setTimeout(() => setLabel('Copy'), 1400); };
  const copy = (e: MouseEvent<HTMLButtonElement>) => {
    const span = e.currentTarget.previousElementSibling;
    const select = () => {
      const s = getSelection();
      if (!span || !s) return;
      const r = document.createRange(); r.selectNodeContents(span); s.removeAllRanges(); s.addRange(r); flash('Selected');
    };
    try { navigator.clipboard.writeText(value).then(() => flash('Copied'), select); } catch { select(); }
  };
  return <button className="copy" type="button" onClick={copy}>{label}</button>;
}

export default function App() {
  const active = useActiveSection();
  const [navExpanded, setNavExpanded] = useState(true);
  const navExpandedRef = useRef(true);
  const collapsePosition = useRef(0);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    }

    let lastScrollY = window.scrollY;
    if (lastScrollY > 150) {
      collapsePosition.current = lastScrollY;
      navExpandedRef.current = false;
      setNavExpanded(false);
    }

    const onScroll = () => {
      const current = window.scrollY;
      if (navExpandedRef.current && current > lastScrollY && current > 150) {
        collapsePosition.current = current;
        navExpandedRef.current = false;
        setNavExpanded(false);
      } else if (!navExpandedRef.current && current < lastScrollY && collapsePosition.current - current > 80) {
        navExpandedRef.current = true;
        setNavExpanded(true);
      }
      lastScrollY = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLElement>) => {
    if (!navExpandedRef.current) {
      event.preventDefault();
      navExpandedRef.current = true;
      setNavExpanded(true);
    }
  };

  const toggleNav = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const next = !navExpandedRef.current;
    navExpandedRef.current = next;
    setNavExpanded(next);
  };

  const handleSectionNavigation = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || (link.closest('.nav') && !navExpandedRef.current)) return;

    const id = link.getAttribute('href')?.slice(1);
    const section = id && document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="site-shell" onDragStartCapture={event => event.preventDefault()} onClickCapture={handleSectionNavigation}>
      <Snow />
      <WinterScrollbar />
      <nav className={`nav ${navExpanded ? 'is-expanded' : 'is-collapsed'}`} aria-label="Sections" onClick={handleNavClick}>
        <div className="inner">
          <a className="brand" href="#top" tabIndex={navExpanded ? 0 : -1}><img src="/art/tent-top.webp" alt="" /><NumericText value={EVENT.name} /></a>
          <ul aria-hidden={!navExpanded}>
            {NAV.map(n => <li key={n.id}><a href={'#' + n.id} aria-current={active === n.id} tabIndex={navExpanded ? 0 : -1}><NumericText value={n.label} /></a></li>)}
          </ul>
          <a className="cta" href="#contact" tabIndex={navExpanded ? 0 : -1}>Pitch your startup</a>
          <button className="nav-toggle" type="button" aria-label={navExpanded ? 'Collapse navigation' : 'Expand navigation'} aria-expanded={navExpanded} onClick={toggleNav}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">{navExpanded ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</svg>
          </button>
        </div>
      </nav>
      <div className="nav-spacer" aria-hidden="true" />

      <Hero />

      <main>
        <section className="band gut" id="about">
          <div className="inner">
            <SecHead eyebrow="Behind the big top" title="About" />
            <div className="about-grid">
              {ABOUT.map(a => (
                <article className="frame" key={a.title}>
                  <Corners />
                    <h3><NumericText value={a.title} /></h3>
                    <p><NumericText value={a.body} /></p>
                  <p className="fact">{a.facts.map(f => <span key={f}><NumericText value={f} /></span>)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band alt gut" id="event">
          <div className="inner">
            <SecHead eyebrow="The event" title="Pitch to Win" />
            <div className="tickets">
              {PITCH.map(p => (
                <div className="tk" key={p.title}><div className="stub"><span>ADMIT ONE</span></div><div className="body"><b><NumericText value={p.title} /></b><small><NumericText value={p.blurb} /></small></div></div>
              ))}
            </div>
          </div>
        </section>

        <section className="band gut" id="flow">
          <div className="inner">
            <SecHead eyebrow="Event flow" title="From Stall to Stage" />
            <p className="quote">{'“'}Sell the dream. Convince the room.{'”'}</p>
            <ol className="flow">
              {FLOW.map(f => (
                <li key={f.title}>
                  <div className={'coin' + (f.metal === 'silver' ? ' silver' : '')} aria-hidden="true"><div><b><NumericText value={f.coin} /></b><small>{f.label}</small></div></div>
                  <div className="card"><span className="k"><NumericText value={f.kicker} /></span><h3><NumericText value={f.title} /></h3><p><NumericText value={f.body} /></p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="band alt gut" id="why">
          <div className="inner">
            <div className="panel"><div className="why-grid">
              <div className="lead"><h2><NumericText value="Why SITank 3.0!" /></h2><p>Why you should be here?</p></div>
              <ul className="checks">{WHY.map(w => <li key={w}><NumericText value={w} /></li>)}</ul>
            </div></div>
          </div>
        </section>

        <section className="band gut" id="sponsor">
          <div className="inner">
            <SecHead eyebrow="For partners" title="Fuel Innovation" banner />
            <p className="spons-intro"><NumericText value={SPONSOR_INTRO} /></p>
            <div className="benefits">{BENEFITS.map(b => <div key={b.text}><Icon name={b.icon} /><b><NumericText value={b.text} /></b></div>)}</div>
            <SecHead title="Title Sponsor" banner />
            <div className="title-sp">
              {TITLE_TIERS.map(t => <article className="tier" key={t}><h3><NumericText value={t} /></h3><div><span className="ph">Details to be announced</span></div></article>)}
            </div>
            <p className="sub-title">Previous sponsors</p>
            <div className="logos">{Array.from({ length: 6 }, (_, i) => <div key={i}>[Logo]</div>)}</div>
            <p style={{ textAlign: 'center', marginTop: 28 }}><a className="cta" href="#contact">Become a sponsor</a></p>
          </div>
        </section>

        <section className="band alt gut" id="gallery">
          <div className="inner">
            <SecHead title="Gallery" banner />
            <div className="gallery">
              {GALLERY.map(g => <figure className="snap" key={g.caption} style={{ '--r': g.tilt + 'deg', margin: 0 }}><div>[Photo]</div><p><NumericText value={g.caption} /></p></figure>)}
            </div>
          </div>
        </section>

        <section className="band gut" id="contact">
          <div className="inner">
            <div className="sec-head"><div className="banner"><h2>Contact Us</h2></div><p className="eyebrow" style={{ marginTop: 14 }}>{EVENT.presenter}</p></div>
            <div className="contacts">
              {CONTACTS.map(c => (
                <div className="ct" key={c.name}>
                  <b><NumericText value={c.name} /></b>
                  <div className="row"><span><NumericText value={c.phone} /></span><CopyButton value={c.phone} /></div>
                  <div className="row"><span><NumericText value={c.email} /></span><CopyButton value={c.email} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="gut">
        <img className="bush-l" src="/art/bush-l.webp" alt="" /><img className="bush-r" src="/art/bush-r.webp" alt="" />
        <div className="inner">
          <div className="fm"><img src="/art/tent-top.webp" alt="" /><strong><NumericText value={EVENT.name} /></strong></div>
          <div className="ribbon"><span>{EVENT.ribbon}</span></div>
          <p>{EVENT.tagline} {'·'} <NumericText value="4–6 FEB 2027" /> {'·'} SIT NAGPUR</p>
        </div>
      </footer>
    </div>
  );
}
