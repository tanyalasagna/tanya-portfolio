export type Project = {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  thumbnail: string;
  role: string[];
  tools: string[];
  duration: string;
  team: string;
  impact: string[];
};

export const projects: Project[] = [
  {
    slug: 'sift',
    title: 'Designing a Pause Before Checkout for Online Shoppers (0→1)',
    tags: ['Graduate Capstone, 2026'],
    description: 'Chrome Extension \\ Behavior Design \\ Claude Code + Figma MCP',
    thumbnail: '/images/Coded Portfolio Thumbnails (1).mp4',
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
    title: 'Rethinking Touchscreen UX for Large Public Kiosks at Frogslayer',
    tags: ['Sponsored Project, 2025'],
    description: 'Design Research \\ Rapid Prototyping \\ Usability Testing',
    thumbnail: '/images/Coded Portfolio Thumbnails (1).png',
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
    title: 'Building a One Stop Marketplace for Fiber Artists (0→1)',
    tags: ['Personal Project, 2024'],
    description: 'Web Platform \\ Marketplace \\ Participatory Design',
    thumbnail: '/images/Coded Portfolio Thumbnails 640x480.mp4',
    role: [],
    tools: [],
    duration: '',
    team: '',
    impact: [],
  },
  {
    slug: 'project-four',
    title: 'Turning a Hospitality Tech Ideathon into a Retrospective eBook',
    tags: ['Client Work, 2023'],
    description: 'eBook \\ Brand Positioning \\ Content Strategy',
    thumbnail: '/images/ebook thumbnail.png',
    role: [],
    tools: [],
    duration: '',
    team: '',
    impact: [],
  },
];
