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
    title: 'Designing a moment of reflection before online purchases (0→1)',
    displayTitle: 'Sift',
    subtitle: 'Designing a moment of reflection before online purchases',
    tags: ['Graduate capstone, 2026'],
    description: 'Web extension \\ Behavioral design \\ AI prototyping',
    thumbnail: '/images/Sift TN (1).mp4',
    thumbnailAspect: '3/2',
    videoPlayOnce: true,
    role: ['Product designer'],
    tools: ['Figma', 'Claude + Figma MCP'],
    duration: 'Spring 2026\n2 months',
    team: 'Just me!',
    impact: [],
  },
  {
    slug: 'capstone',
    title: 'Rethinking touchscreen UX for self-service kiosks at Frogslayer',
    displayTitle: 'Frogslayer',
    subtitle: 'Rethinking touchscreen UX for self-service kiosks',
    mobileTitle: 'Rethinking touchscreen UX for self-service kiosks',
    tags: ['Sponsored project, 2025'],
    description: 'Design research \\ Rapid prototyping \\ Usability testing',
    thumbnail: '/images/fs new pixel.png',
    thumbnailAspect: '4/3',
    role: ['UX designer', 'Lead - Usability testing'],
    tools: ['UX design & research', 'Usability testing'],
    duration: 'Fall 2025\n4 months',
    team: '(5 researchers and designers)\nChanseo, Kathleen, Nina, Raelee & Ryan',
    impact: [],
    teamLabel: 'Collaborators',
    toolsLabel: 'Skills',
  },
  {
    slug: 'project-three',
    title: 'Building a digital toolkit for fiber artists',
    displayTitle: 'Loopyloop',
    subtitle: 'Building a digital toolkit for fiber artists',
    tags: ['Personal project, 2024'],
    description: 'Web platform \\ Usability testing \\ Participatory design',
    thumbnail: '/images/ll rounded.mp4',
    thumbnailAspect: '3/2',
    videoPlayOnce: true,
    videoEndOnFirstFrame: true,
    role: ['UX designer', 'Researcher'],
    tools: ['Web design', 'Contextual research', 'Participatory design'],
    duration: 'Fall 2024\n1 month',
    team: '(3 Designers)\nAffan, Kareena and Mustafa',
    impact: [],
    teamLabel: 'Collaborators',
    toolsLabel: 'Skills',
  },
  {
    slug: 'project-four',
    title: 'Crafting an eBook around the future of hospitality',
    displayTitle: 'Return on Imagination',
    subtitle: 'Crafting an eBook around the future of hospitality',
    tags: ['Client work, 2023'],
    description: 'eBook \\ Brand positioning \\ Content writing',
    thumbnail: '/images/roi green.png',
    thumbnailAspect: '4/3',
    role: ['Content writing', 'Concept ideation'],
    tools: ['Content writing', 'Storytelling'],
    duration: 'Early 2023\n3 weeks',
    team: 'Julian Fernando (Graphic designer)\nFemina Somnath (Editor)',
    impact: [],
    teamLabel: 'Collaborators',
    toolsLabel: 'Skills',
  },
];
