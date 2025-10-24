// Profile content data for the hero section and about page

export const PROFILE_DATA = {
  personal: {
    name: '👋 Hey, I\'m Pasha!',
    title: 'Context Engineer & Multi-Agent Systems Architect',
    location: 'Bangkok, Thailand',
    email: 'hello@karpov.dev',
    bio: 'Passionate about creating innovative solutions through modern web technologies, blockchain systems, and AI-powered applications.',
    tagline: 'Building the future with code • One pixel at a time',
    availability: 'Available for opportunities',
  },

  profileImage: {
    src: '/myPhoto.jpeg',
    alt: 'Professional headshot of Karpov - Context Engineer and Multi-Agent Systems Architect',
    width: 400,
    height: 400,
  },

  resume: {
    url: '/resume.pdf',
    filename: 'karpov-resume.pdf',
    label: 'Download Resume',
  },

  socialLinks: {
    github: {
      url: 'https://github.com/karpovpw',
      username: 'karpovpw',
      label: 'Follow on GitHub',
    },
    linkedin: {
      url: 'https://linkedin.com/in/karpovpw',
      label: 'Connect on LinkedIn',
    },
    email: {
      url: 'mailto:hello@karpov.dev',
      label: 'Send Email',
    },
  },

  stats: {
    experience: {
      years: 5,
      label: 'Years Experience',
    },
    projects: {
      count: 50,
      label: 'Projects Completed',
    },
    technologies: {
      count: 15,
      label: 'Technologies Mastered',
    },
    clients: {
      count: 20,
      label: 'Happy Clients',
    },
  },

  skills: {
    frontend: {
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 95, years: 4 },
        { name: 'Next.js', level: 90, years: 3 },
        { name: 'TypeScript', level: 90, years: 3 },
        { name: 'Tailwind CSS', level: 85, years: 2 },
        { name: 'Framer Motion', level: 80, years: 2 },
        { name: 'Vue.js', level: 75, years: 2 },
      ],
    },
    backend: {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85, years: 4 },
        { name: 'Python', level: 80, years: 3 },
        { name: 'PostgreSQL', level: 75, years: 3 },
        { name: 'MongoDB', level: 70, years: 2 },
        { name: 'Redis', level: 65, years: 2 },
        { name: 'GraphQL', level: 70, years: 2 },
      ],
    },
    blockchain: {
      title: 'Blockchain & Web3',
      skills: [
        { name: 'Solidity', level: 80, years: 2 },
        { name: 'Web3.js', level: 75, years: 2 },
        { name: 'Ethers.js', level: 75, years: 2 },
        { name: 'Smart Contracts', level: 70, years: 2 },
        { name: 'DeFi Protocols', level: 65, years: 1 },
        { name: 'NFT Development', level: 60, years: 1 },
      ],
    },
    ai_ml: {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'Python ML', level: 75, years: 2 },
        { name: 'TensorFlow', level: 70, years: 2 },
        { name: 'PyTorch', level: 65, years: 1 },
        { name: 'OpenAI API', level: 80, years: 2 },
        { name: 'LangChain', level: 70, years: 1 },
        { name: 'Hugging Face', level: 65, years: 1 },
      ],
    },
    devops: {
      title: 'DevOps & Cloud',
      skills: [
        { name: 'Docker', level: 80, years: 3 },
        { name: 'Kubernetes', level: 70, years: 2 },
        { name: 'AWS', level: 75, years: 3 },
        { name: 'CI/CD', level: 80, years: 3 },
        { name: 'Terraform', level: 65, years: 2 },
        { name: 'Monitoring', level: 70, years: 2 },
      ],
    },
  },

  expertise: {
    primary: [
      'Full Stack Development',
      'Multi-Agent Systems',
      'Blockchain Solutions',
      'AI Integration',
      'Performance Optimization',
      'System Architecture',
    ],
    secondary: [
      'Technical Leadership',
      'Code Review',
      'Mentoring',
      'Project Management',
      'Client Communication',
      'Product Strategy',
    ],
  },

  achievements: [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      description: 'Led development of scalable web applications serving 100K+ users',
    },
    {
      title: 'Blockchain Developer',
      company: 'DeFi Startup',
      period: '2021 - 2022',
      description: 'Built smart contracts and DeFi protocols with $2M+ TVL',
    },
    {
      title: 'Frontend Engineer',
      company: 'Digital Agency',
      period: '2020 - 2021',
      description: 'Developed responsive web applications for enterprise clients',
    },
  ],

  education: [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      year: '2020',
      location: 'Bangkok, Thailand',
    },
    {
      degree: 'Blockchain Development Certification',
      institution: 'Blockchain Academy',
      year: '2021',
      location: 'Online',
    },
  ],

  languages: [
    { name: 'Thai', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Japanese', level: 'Intermediate' },
  ],

  interests: [
    'Open Source Contribution',
    'AI Research',
    'Blockchain Innovation',
    'Photography',
    'Travel',
    'Gaming',
  ],
}