export type Project = {
  slug: string;
  title: string;
  mobileTitle?: string;
  tags: string[];
  description: string;
  thumbnail: string;
  thumbnailAspect?: string;
  videoPlayOnce?: boolean;
  videoEndOnFirstFrame?: boolean;
  role: string[];
  tools: string[];
  duration: string;
  team: string;
  impact: string[];
};

export const projects: Project[] = [
  {
    slug: 'sift',
    title: 'Designing a Pause Before Checkout (0→1)',
    tags: ['Graduate Capstone, 2026'],
    description: 'Web Extension \\ Behavior Design \\ Claude Code',
    thumbnail: '/images/Sift TN (1).mp4',
    thumbnailAspect: '3/2',
    videoPlayOnce: true,
    role: ['Product Designer', 'UX Researcher'],
    tools: ['Figma', 'Figma Make', 'Claude', 'Cursor', 'Notebook LM'],
    duration: '4 weeks',
    team: 'Self + Head of Engineering + 2 Developers + CEO',
    impact: [
      'Reduced context switching by enabling end-to-end domain setup within Fletch.',
      'De-risked a high-friction step with guided setup and clear system states.',
    ],
  },
  {
    slug: 'capstone',
    title: 'Rethinking Touchscreen UX for Self-Service Kiosks at Frogslayer',
    mobileTitle: 'Rethinking Touchscreen UX for Self-Service Kiosks',
    tags: ['Sponsored Project, 2025'],
    description: 'Design Research \\ Prototyping \\ Usability Testing',
    thumbnail: '/images/fs new pixel.png',
    role: ['Product Designer'],
    tools: ['Figma', 'Miro', 'Maze'],
    duration: '8 weeks',
    team: 'Self + 3 collaborators',
    impact: [
      'Improved information architecture, reducing task completion time by 30%.',
      'Established a reusable design system used across 4 product areas.',
    ],
  },
  {
    slug: 'project-three',
    title: 'Building a One-Stop Marketplace for Fiber Artists',
    tags: ['Personal Project, 2024'],
    description: 'Web Platform \\ Marketplace \\ Participatory Design',
    thumbnail: '/images/ll rounded.mp4',
    thumbnailAspect: '3/2',
    videoPlayOnce: true,
    videoEndOnFirstFrame: true,
    role: [],
    tools: [],
    duration: '',
    team: '',
    impact: [],
  },
  {
    slug: 'project-four',
    title: 'Turning a Hospitality Tech Ideathon into an eBook',
    tags: ['Client Work, 2023'],
    description: 'eBook \\ Brand Positioning \\ Content Writing',
    thumbnail: '/images/roi green.png',
    role: [],
    tools: [],
    duration: '',
    team: '',
    impact: [],
  },
];
