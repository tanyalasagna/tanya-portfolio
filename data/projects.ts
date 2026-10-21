export type Project = {
  slug: string;
  title: string;
  displayTitle?: string;
  subtitle?: string;
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
  teamLabel?: string;
  toolsLabel?: string;
};

export const projects: Project[] = [
  {
    slug: 'sift',
    title: 'Designing a Pause Before Checkout (0→1)',
    displayTitle: 'Sift',
    subtitle: 'Designing a Pause Before Checkout (0→1)',
    tags: ['Graduate Capstone, 2026'],
    description: 'Web Extension \\ Behavior Design',
    thumbnail: '/images/Sift TN (1).mp4',
    thumbnailAspect: '3/2',
    videoPlayOnce: true,
    role: ['Product Designer'],
    tools: ['Figma', 'Claude + Figma MCP'],
    duration: 'Spring 2026\n2 months',
    team: 'Just me!',
    impact: [],
  },
  {
    slug: 'capstone',
    title: 'Rethinking Touchscreen UX for Self-Service Kiosks',
    displayTitle: 'Frogslayer',
    subtitle: 'Rethinking Touchscreen UX for Self-Service Kiosks',
    mobileTitle: 'Rethinking Touchscreen UX for Self-Service Kiosks',
    tags: ['Sponsored Project, 2025'],
    description: 'Design Research \\ Prototyping',
    thumbnail: '/images/fs new pixel.png',
    thumbnailAspect: '4/3',
    role: ['UX Designer', 'Lead — Usability Testing'],
    tools: ['UX design & research', 'Usability testing'],
    duration: 'Fall 2025\n4 months',
    team: '(5 researchers and designers)\nChanseo, Kathleen, Nina, Raelee & Ryan',
    impact: [],
    teamLabel: 'Collaborators',
    toolsLabel: 'Skills',
  },
  {
    slug: 'project-three',
    title: 'Building a One-Stop Marketplace for Fiber Artists',
    displayTitle: 'Loopyloop',
    subtitle: 'Building a One-Stop Marketplace for Fiber Artists',
    tags: ['Personal Project, 2024'],
    description: 'Web Platform \\ Marketplace',
    thumbnail: '/images/ll rounded.mp4',
    thumbnailAspect: '3/2',
    videoPlayOnce: true,
    videoEndOnFirstFrame: true,
    role: ['UX designer and researcher'],
    tools: ['Web design', 'Contextual research', 'Participatory design'],
    duration: 'Fall 2024\n1 month',
    team: '(3 Designers)\nAffan, Kareena and Mustafa',
    impact: [],
    teamLabel: 'Collaborators',
    toolsLabel: 'Skills',
  },
  {
    slug: 'project-four',
    title: 'Turning a Hospitality-Tech Ideathon into an eBook',
    displayTitle: 'Return on Imagination',
    subtitle: 'Turning a Hospitality-Tech Ideathon into an eBook',
    tags: ['Client Work, 2023'],
    description: 'eBook \\ Brand Positioning',
    thumbnail: '/images/roi green.png',
    thumbnailAspect: '4/3',
    role: ['Content writing, concept'],
    tools: ['Content writing', 'Storytelling'],
    duration: 'Early 2023\n3 weeks',
    team: 'Julian Fernando (Graphic designer)\nFemina Somnath (Editor)',
    impact: [],
    teamLabel: 'Collaborators',
    toolsLabel: 'Skills',
  },
];
