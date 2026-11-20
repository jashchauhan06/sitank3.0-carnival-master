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
  { id: 'why', label: 'Why SITank 3.0' }, { id: 'sponsor', label: 'Sponsor' }, { id: 'team', label: 'Our Team' }, { id: 'contact', label: 'Contact' },
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

export const PAST_SPONSORS = [
  { name: 'Insterra', logo: '/art/insterra.webp' },
  { name: 'Incubein Foundation', logo: '/art/Incubein%20Foundation.webp' },
  { name: 'Harrier', logo: '/art/Harrier.webp' },
] as const;

export interface Snap { caption: string; alt: string; image: string; tilt: number }
export const GALLERY: readonly Snap[] = [
  { image: '/art/optimized/gallery/1.webp', alt: 'Guests and students at an inauguration ribbon cutting', caption: 'Inauguration', tilt: -2.5 },
  { image: '/art/optimized/gallery/2.webp', alt: 'A mentor and students discussing a robotics project', caption: 'Project Demo', tilt: 1.8 },
  { image: '/art/optimized/gallery/3.webp', alt: 'Guests visiting student exhibition displays', caption: 'Jury Walkthrough', tilt: -1.2 },
  { image: '/art/optimized/gallery/4.webp', alt: 'Students presenting projects at exhibition stalls', caption: 'Exhibition Stalls', tilt: 2.2 },
  { image: '/art/optimized/gallery/5.webp', alt: 'A mentor speaking with a student team at their stall', caption: 'Mentor Session', tilt: -1.8 },
  { image: '/art/optimized/gallery/6.webp', alt: 'SITank participants gathered outside the institute', caption: 'SITank Community', tilt: 1.2 },
  { image: '/art/optimized/gallery/7.webp', alt: 'Guests viewing a student project beneath a red canopy', caption: 'Live Demonstrations', tilt: -1.5 },
  { image: '/art/optimized/gallery/8.webp', alt: 'Audience attending a startup pitching session', caption: 'Pitching Session', tilt: 1.6 },
];

export interface Contact { name: string; phone: string; email: string; photo: string; role: string }
export const CONTACTS: readonly Contact[] = [
  { name: 'Nehal Saad', role: 'Coordinator', phone: '+91 7499516411', email: 'nehal.saad.batch2025@sitnagpur.siu.edu.in', photo: '/art/optimized/team/NehalSaad.webp' },
  { name: 'Parth Tiwaskar', role: 'Coordinator', phone: '+91 9112374118', email: 'parth.tiwaskar.batch2024@sitnagpur.siu.edu.in', photo: '/art/optimized/team/parth-tiwaskar.webp' },
  { name: 'Siddhesh Thakur', role: 'Co-Coordinator', phone: '+91 9930577000', email: 'siddhesh.thakur.batch2025@sitnagpur.siu.edu.in', photo: '/art/optimized/team/siddesh-thakur.webp' },
  { name: 'Aaditya Wanjari', role: 'Co-Coordinator', phone: '+91 7558783048', email: 'aaditya.wanjari.batch2025@sitnagpur.siu.edu.in', photo: '/art/optimized/team/Aditya wanjari.webp' },
  { name: 'Laksh Rathi', role: 'Co-Coordinator', phone: '+91 9529641866', email: 'laksh.rathi.batch2026@sitnagpur.siu.edu.in', photo: '/art/optimized/team/Laksh Rathi.webp' },
  { name: 'Anirudh Jajoo', role: 'Co-Coordinator', phone: '+91 8668693168', email: 'anirudh.jajoo.batch2026@sitnagpur.siu.edu.in', photo: '/art/optimized/team/Anirudh Jajoo.webp' },
];

export interface TeamMember { name: string; role: string; photo: string; temporaryPhoto?: boolean }
export const TEAM_LEADERS: readonly TeamMember[] = [
  { name: 'Prathmesh Raipurkar', role: 'President', photo: '/art/optimized/team/prathmesh-raipurkar.webp' },
  { name: 'Harsh Kumar', role: 'Vice President (Technical)', photo: '/art/optimized/team/harsh-kumar.webp' },
  { name: 'Swanandi Thaker', role: 'Vice President (Co-Curricular)', photo: '/art/optimized/team/swanandi-thaker.webp' },
  { name: 'Heena Khilnani', role: 'Sponsorship', photo: '/art/optimized/team/heena-khilnani.webp' },
  { name: 'Jash Chauhan', role: 'Web & IT', photo: '/art/optimized/team/jash.webp' },
  { name: 'Ansh Sonkusare', role: 'Web & IT', photo: '/art/optimized/team/no-image.png' },
];

export const TEAM: readonly TeamMember[] = [
  ...TEAM_LEADERS,
  ...CONTACTS.map(({ name, photo, role }) => ({ name, role, photo })),
];
