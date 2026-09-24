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
    title: 'Sift',
    tags: ['Product Design', 'UX Research'],
    description:
      'A tool for managing and surfacing relevant information across knowledge bases — reducing context switching and enabling end-to-end domain setup.',
    thumbnail: '',
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
    title: 'Capstone',
    tags: ['Product Design', 'Content Strategy'],
    description:
      'An end-to-end redesign exploring content hierarchy and navigation patterns across a complex information architecture.',
    thumbnail: '',
    role: ['Product Designer'],
    tools: ['Figma', 'Miro', 'Maze'],
    duration: '8 weeks',
    team: 'Self + 3 collaborators',
    impact: [
      'Improved information architecture, reducing task completion time by 30%.',
      'Established a reusable design system used across 4 product areas.',
    ],
  },
];
