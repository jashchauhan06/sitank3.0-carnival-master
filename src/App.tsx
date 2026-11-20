import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import Hero from './Hero';
import { Corners, SecHead, Snow, NumericText } from './bits';
import { EVENT, NAV, ABOUT, PITCH, FLOW, WHY, TITLE_TIERS, PAST_SPONSORS, GALLERY, CONTACTS, TEAM } from './content';

const CONTACT_EMAIL = 'ecell@sitnagpur.siu.edu.in';

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

function useFlowStep() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const track = document.querySelector<HTMLElement>('#flow .flow-track');
    const stage = document.querySelector<HTMLElement>('#flow .flow-stage');
    if (!track || !stage) return;
    let previous = -1;
    const updateStep = () => {
      const stickyTop = Number.parseFloat(getComputedStyle(stage).top) || 0;
      const travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = Math.max(0, Math.min(0.999999, (stickyTop - track.getBoundingClientRect().top) / travel));
      const next = Math.min(2, Math.floor(progress * 3));
      if (next !== previous) {
        previous = next;
        setActiveStep(next);
      }
    };
    updateStep();
    window.addEventListener('scroll', updateStep, { passive: true });
    window.addEventListener('resize', updateStep);
    return () => {
      window.removeEventListener('scroll', updateStep);
      window.removeEventListener('resize', updateStep);
    };
  }, []);
  return activeStep;
}

function ContactIcon({ type }: { type: 'location' | 'email' | 'phone' }) {
  return <div className="contact-icon" aria-hidden="true">
    <svg className="contact-icon-snow" viewBox="0 0 66 16" preserveAspectRatio="none"><path d="M2 12C12 1 26 6 36 3S56 5 64 12L62 15H4Z" fill="#f3f8ff" /><path d="m14 14 2 8 2-8m30 0 2 7 2-7" fill="#d3e6ff" /></svg>
    <svg className="contact-icon-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {type === 'location' && <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>}
      {type === 'email' && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>}
      {type === 'phone' && <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a14 14 0 0 1-7-7l3-2-3-6Z" />}
    </svg>
  </div>;
}

function ContactSection() {
  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get('subject') || 'SITank 3.0 enquiry');
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return <section className="band gut contact-section" id="contact">
    <div className="inner">
      <div className="sec-head"><div className="banner"><h2>Contact Us</h2></div><p className="eyebrow" style={{ marginTop: 14 }}>{EVENT.presenter}</p></div>
      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-item">
            <ContactIcon type="location" />
            <div className="contact-copy"><h3>Location</h3><p>Symbiosis Institute of Technology,<br />Nagpur, Maharashtra, India</p></div>
          </div>
          <div className="contact-item">
            <ContactIcon type="email" />
            <div className="contact-copy"><h3>Email</h3><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
          </div>
          <div className="contact-item contact-people">
            <ContactIcon type="phone" />
            <div className="contact-copy"><h3>Connect</h3>
              <ul>{CONTACTS.map(contact => <li key={contact.name}><a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}><span>{contact.name}</span><span>{contact.phone}</span></a></li>)}</ul>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={sendMessage}>
          <span className="form-snow-cap" aria-hidden="true" />
          <span className="form-flake form-flake-left" aria-hidden="true">✳</span>
          <span className="form-flake form-flake-right" aria-hidden="true">✳</span>
          <div className="form-fields-row">
            <div className="contact-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" placeholder="Your Name" autoComplete="name" required /></div>
            <div className="contact-field"><label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" placeholder="Email ID" autoComplete="email" required /></div>
          </div>
          <div className="contact-field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" type="text" placeholder="Subject..." required /></div>
          <div className="contact-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="Write your message here..." rows={5} required /></div>
          <div className="form-submit-wrap">
            <span className="submit-holly" aria-hidden="true">❧</span>
            <button className="contact-submit" type="submit"><span aria-hidden="true">✉</span> Send message</button>
            <span className="submit-sparkle" aria-hidden="true">✦　·　✧　·　✦</span>
          </div>
          <p className="form-helper">Opens your email app to send your message.</p>
        </form>
      </div>
    </div>
  </section>;
}

export default function App() {
  const active = useActiveSection();
  const activeFlowStep = useFlowStep();
  const [loading, setLoading] = useState(true);
  const [navExpanded, setNavExpanded] = useState(() => window.matchMedia('(max-width: 900px)').matches === false);
  const navExpandedRef = useRef(navExpanded);
  const collapsePosition = useRef(0);

  useEffect(() => {
    const pageImages = Array.from(document.querySelectorAll<HTMLImageElement>('.site-shell img'))
      .filter(img => !img.closest('.preloader'));
    const imageReady = pageImages.map(img => img.complete
      ? img.decode().catch(() => undefined)
      : new Promise<void>(resolve => {
        const finishImage = () => { img.decode().catch(() => undefined).then(() => resolve()); };
        img.addEventListener('load', finishImage, { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      }));
    pageImages.forEach(img => { img.loading = 'eager'; });
    const video = document.querySelector<HTMLVideoElement>('#top video');
    const videoReady = !video || !video.autoplay || video.readyState >= 2
      ? Promise.resolve()
      : new Promise<void>(resolve => {
        video.addEventListener('loadeddata', () => resolve(), { once: true });
        video.addEventListener('error', () => resolve(), { once: true });
      });
    const fontsReady = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      setLoading(false);
    };
    const timeout = window.setTimeout(finish, 5000);
    Promise.all([...imageReady, videoReady, fontsReady]).then(finish);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const syncVisibleWidth = () => {
      const visibleWidth = Math.max(window.innerWidth, viewport?.width ?? window.innerWidth);
      document.documentElement.style.setProperty('--visible-viewport-width', `${visibleWidth}px`);
    };
    syncVisibleWidth();
    viewport?.addEventListener('resize', syncVisibleWidth);
    window.addEventListener('resize', syncVisibleWidth);
    return () => {
      viewport?.removeEventListener('resize', syncVisibleWidth);
      window.removeEventListener('resize', syncVisibleWidth);
      document.documentElement.style.removeProperty('--visible-viewport-width');
    };
  }, []);

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
      <div className={`preloader${loading ? '' : ' is-ready'}`} aria-hidden={!loading}>
        <div className="preloader-content" role="status" aria-live="polite">
          <img src="/art/tent-top.webp" alt="" />
          <p>Entrepreneurship Cell, SIT Nagpur</p>
          <h1>SITank 3.0</h1>
          <span className="preloader-message">Preparing the winter carnival</span>
          <span className="preloader-progress"><span /></span>
        </div>
      </div>
      <Snow />
      <nav className={`nav ${navExpanded ? 'is-expanded' : 'is-collapsed'}`} aria-label="Sections" onClick={handleNavClick}>
        <div className="inner">
          <a className="brand" href="#top" tabIndex={navExpanded ? 0 : -1}><img src="/art/tent-top.webp" alt="" /><NumericText value={EVENT.name} /></a>
          <ul aria-hidden={!navExpanded}>
            {NAV.map(n => <li key={n.id}><a href={'#' + n.id} aria-current={active === n.id} tabIndex={navExpanded ? 0 : -1}><NumericText value={n.label} /></a></li>)}
          </ul>
          <a className="cta" href="#register-now" tabIndex={navExpanded ? 0 : -1}>Pitch your startup</a>
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
          <div className="flow-track">
            <div className="flow-stage">
              <div className="flow-content">
                <div className="flow-intro">
                  <SecHead eyebrow="Event flow" title="From Stall to Stage" />
                  <p className="quote">{'“'}Sell the dream. Convince the room.{'”'}</p>
                </div>
                <div className="flow-window">
                  <ol className="flow" data-step={activeFlowStep}>
                    {FLOW.map((f, index) => (
                      <li key={f.title} aria-hidden={activeFlowStep !== index}>
                        <div className={'coin' + (f.metal === 'silver' ? ' silver' : '')} aria-hidden="true"><div><b><NumericText value={f.coin} /></b><small>{f.label}</small></div></div>
                        <div className="tk flow-ticket">
                          <div className="stub"><span>Admit one</span></div>
                          <div className="body"><span className="k"><NumericText value={f.kicker} /></span><h3><NumericText value={f.title} /></h3><p><NumericText value={f.body} /></p></div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
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
            <SecHead title="In Collaboration with" banner />
            <div className="title-sp">
              {TITLE_TIERS.map(t => <article className="tier" key={t}><h3><NumericText value={t} /></h3><div><span className="ph">Details to be announced</span></div></article>)}
            </div>
            <p className="sub-title">Previous sponsors</p>
            <div className="logos">{PAST_SPONSORS.map(sponsor => <div className="sponsor-logo" key={sponsor.name}><img src={sponsor.logo} alt={`${sponsor.name} logo`} /></div>)}</div>
            <p style={{ textAlign: 'center', marginTop: 28 }}><a className="cta sponsor-cta" href="#contact">Become a sponsor</a></p>
          </div>
        </section>

        <section className="band alt gut" id="gallery">
          <div className="inner">
            <SecHead title="Gallery" banner />
            <div className="gallery">
              {GALLERY.map(g => <figure className="snap" key={g.caption} style={{ '--r': g.tilt + 'deg', margin: 0 }}><img className="gallery-photo" src={g.image} alt={g.alt} loading="lazy" decoding="async" /><p><NumericText value={g.caption} /></p></figure>)}
            </div>
          </div>
        </section>

        <section className="band gut team-section" id="team">
          <div className="inner">
            <SecHead title="Our Team" banner />
            <p className="team-intro">Meet the student team behind SITank 3.0.</p>
            <div className="team-grid">
              {TEAM.map(member => <article className="team-card" key={member.name}>
                <div className="team-photo-wrap">
                  <img src={member.photo} alt={member.temporaryPhoto ? `Temporary portrait placeholder for ${member.name}` : `${member.name}, ${member.role}`} loading="lazy" decoding="async" />
                  {member.temporaryPhoto && <span>Temporary portrait</span>}
                </div>
                <h3><NumericText value={member.name} /></h3>
                <p>{member.role}</p>
              </article>)}
            </div>
          </div>
        </section>

        <ContactSection />
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
