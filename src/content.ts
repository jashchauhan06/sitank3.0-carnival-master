import type { IconName } from './bits';

// All page copy lives here. Text from the SITank 3.0 brochure (Copy of About Sit.pdf); "TBA" items are blank in the brochure.
export const EVENT = {
  presenter: 'Entrepreneurship Cell, SIT Nagpur',
  name: 'SITank 3.0',
  ribbon: 'WINTER CARNIVAL',
  tagline: 'FROM PITCH TO POWER',
  venue: 'SIT Nagpur',
  startsAt: '2027-02-04T09:00:00+05:30',
} as const;

export interface NavItem { id: string; label: string }
export const NAV: readonly NavItem[] = [
  { id: 'about', label: 'About' }, { id: 'event', label: 'The Event' }, { id: 'flow', label: 'Flow' },
  { id: 'why', label: 'Why SITank 3.0' }, { id: 'sponsor', label: 'Sponsor' }, { id: 'contact', label: 'Contact' },
];

export interface AboutCard { title: string; body: string; facts: readonly string[] }
export const ABOUT: readonly AboutCard[] = [
  {
    title: 'About SIT',
    body: 'Symbiosis Institute of Technology (SIT), Nagpur is a premier engineering institute established in 2021 under Symbiosis International (Deemed) University, Pune. The institute is committed to delivering industry-oriented education, fostering innovation, and nurturing future-ready engineers.',
    facts: ['Est. 2021', 'Symbiosis International (Deemed) University'],
  },
  {
    title: 'About SITank 3.0',
    body: 'SITank 3.0 is the flagship startup and innovation platform of the Entrepreneurship Cell, SIT Nagpur. Inspired by real-world venture capital ecosystems, SITank 3.0 empowers students to ideate, validate, build, and pitch startup ideas with strong market potential.',
    facts: ['Ideate', 'Validate', 'Build', 'Pitch'],
  },
];

export interface PitchPoint { title: string; blurb: string }
export const PITCH: readonly PitchPoint[] = [
  { title: 'Present your startup to a panel of judges', blurb: 'Your idea, your numbers, one room to convince.' },
  { title: 'Focus on market fit, scalability & revenue', blurb: 'The questions real investors ask first.' },
  { title: 'Real VC-style pitching experience', blurb: 'Pitch the way founders do in front of a fund.' },
  { title: 'Opportunity for mentorship & investment exposure', blurb: 'Meet the people who can help you take it further.' },
];

export type Metal = 'silver' | 'gold';
export interface FlowStep { coin: string; label: string; metal: Metal; kicker: string; title: string; body: string }
export const FLOW: readonly FlowStep[] = [
  { coin: '1', label: 'ROUND', metal: 'silver', kicker: 'Round 1', title: 'Exhibition Round', body: 'Showcase your startup through stalls and live interaction with visitors and judges.' },
  { coin: '2', label: 'ROUND', metal: 'silver', kicker: 'Round 2', title: 'Jury Pitching Round', body: 'Pitch your business to the jury like a real founder.' },
  { coin: '★', label: 'FINALE', metal: 'gold', kicker: 'Finale', title: 'Winners Announced', body: 'Best ideas. Best execution. Best storytellers.' },
];

export const WHY: readonly string[] = [
  'Learn how startups actually raise money',
  'Understand markets, users & numbers',
  'Get mentored by industry & startup experts',
  'Build confidence in pitching & storytelling',
  'Compete for high-value rewards',
];

export const SPONSOR_INTRO = 'Partnering with SITank 3.0 connects sponsors with emerging entrepreneurial talent while amplifying brand visibility in an innovation-driven ecosystem.';

export interface Benefit { icon: IconName; text: string }
export const BENEFITS: readonly Benefit[] = [
  { icon: 'star', text: 'Direct access to high-potential talent' },
  { icon: 'people', text: 'Meaningful engagement & networking' },
  { icon: 'target', text: 'Targeted brand visibility' },
  { icon: 'megaphone', text: 'Digital & on-ground promotion' },
  { icon: 'bars', text: 'Thought leadership & industry presence' },
  { icon: 'bulb', text: 'Support innovation & entrepreneurship' },
];

export const TITLE_TIERS: readonly string[] = ['Digital & Media Visibility', 'On-Ground Branding', 'Engagement & Participation', 'Merchandise & Branding'];

export interface Snap { caption: string; tilt: number }
export const GALLERY: readonly Snap[] = [
  { caption: 'Exhibition stalls', tilt: -2.5 }, { caption: 'Jury pitching', tilt: 1.8 }, { caption: 'The big reveal', tilt: -1.2 }, { caption: 'Mentor sessions', tilt: 2.2 }, { caption: 'Carnival nights', tilt: -1.8 }, { caption: 'Winners', tilt: 1.2 },
];

export interface Contact { name: string; phone: string; email: string }
export const CONTACTS: readonly Contact[] = [
  { name: 'Nehal Saad', phone: '+91 74995 16411', email: 'nehal.saad.batch2025@sitnagpur.siu.edu.in' },
  { name: 'Siddhesh Thakur', phone: '+91 99305 77000', email: 'siddhesh.thakur.batch2025@sitnagpur.siu.edu.in' },
  { name: 'Parth Tiwaskar', phone: '+91 91123 74118', email: 'parth.tiwaskar.batch2024@sitnagpur.siu.edu.in' },
  { name: 'Aaditya Wanjari', phone: '+91 75587 83048', email: 'aaditya.wanjari.batch2025@sitnagpur.siu.edu.in' },
  { name: 'Laksh Rathi', phone: '+91 95296 41866', email: 'laksh.rathi.batch2026@sitnagpur.siu.edu.in' },
  { name: 'Anirudh Jajoo', phone: '+91 86686 93168', email: 'anirudh.jajoo.batch2026@sitnagpur.siu.edu.in' },
];
