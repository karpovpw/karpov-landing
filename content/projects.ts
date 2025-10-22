// Portfolio projects data for the showcase

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  category: 'web' | 'crypto' | 'mobile' | 'ai' | 'devops'
  status: 'completed' | 'in-progress' | 'maintenance'
  featured: boolean
  technologies: string[]
  images: {
    thumbnail: string
    screenshots: string[]
    featured?: string
  }
  links: {
    demo?: string
    github?: string
    caseStudy?: string
  }
  metrics?: {
    users?: number
    performance?: string
    impact?: string
  }
  startDate: string
  endDate?: string
  teamSize?: number
  role: string
}

export const PROJECTS: Project[] = [
  {
    id: 'ai-chat-platform',
    title: 'AI Chat Platform',
    slug: 'ai-chat-platform',
    description: 'Enterprise-grade conversational AI platform with multi-agent orchestration and real-time responses.',
    longDescription: `
      Built a sophisticated AI-powered chat platform that orchestrates multiple AI agents to provide
      intelligent responses across various domains. The platform features real-time messaging,
      context awareness, and seamless integration with popular business tools.

      Key achievements:
      - Reduced customer service response time by 80%
      - Integrated with 15+ business systems
      - Achieved 99.9% uptime with auto-scaling infrastructure
      - Processed 100K+ conversations daily
    `,
    category: 'ai',
    status: 'completed',
    featured: true,
    technologies: ['React', 'Next.js', 'Node.js', 'OpenAI API', 'WebSocket', 'Redis', 'PostgreSQL', 'Docker'],
    images: {
      thumbnail: '/images/projects/ai-chat-platform/thumbnail.jpg',
      featured: '/images/projects/ai-chat-platform/featured.jpg',
      screenshots: [
        '/images/projects/ai-chat-platform/screenshot1.jpg',
        '/images/projects/ai-chat-platform/screenshot2.jpg',
        '/images/projects/ai-chat-platform/screenshot3.jpg',
      ],
    },
    links: {
      demo: 'https://ai-chat-demo.karpov.dev',
      github: 'https://github.com/karpovpw/ai-chat-platform',
      caseStudy: '/articles/ai-chat-platform-case-study',
    },
    metrics: {
      users: 50000,
      performance: '99.9% uptime',
      impact: '80% faster response time',
    },
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    teamSize: 5,
    role: 'Lead Developer & AI Architect',
  },
  {
    id: 'defi-lending-protocol',
    title: 'DeFi Lending Protocol',
    slug: 'defi-lending-protocol',
    description: 'Secure and efficient decentralized lending platform with risk management and yield optimization.',
    longDescription: `
      Developed a comprehensive DeFi lending protocol that enables users to lend and borrow
      cryptocurrencies with advanced risk management features. The platform includes automated
      yield farming, liquidation protection, and governance mechanisms.

      Technical innovations:
      - Novel liquidation algorithm reducing gas costs by 60%
      - Multi-chain deployment strategy
      - Advanced oracle integration for accurate price feeds
      - Comprehensive security audits and formal verification
    `,
    category: 'crypto',
    status: 'completed',
    featured: true,
    technologies: ['Solidity', 'Hardhat', 'React', 'Web3.js', 'Chainlink', 'Compound', 'Uniswap'],
    images: {
      thumbnail: '/images/projects/defi-protocol/thumbnail.jpg',
      featured: '/images/projects/defi-protocol/featured.jpg',
      screenshots: [
        '/images/projects/defi-protocol/screenshot1.jpg',
        '/images/projects/defi-protocol/screenshot2.jpg',
      ],
    },
    links: {
      demo: 'https://app.defi-lending.xyz',
      github: 'https://github.com/karpovpw/defi-lending-protocol',
    },
    metrics: {
      users: 25000,
      performance: '$50M+ TVL',
      impact: '60% gas cost reduction',
    },
    startDate: '2023-08-01',
    endDate: '2023-12-15',
    teamSize: 4,
    role: 'Blockchain Developer & Smart Contract Engineer',
  },
  {
    id: 'ecommerce-platform',
    title: 'Modern E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Full-stack e-commerce solution with advanced product catalog, payment processing, and analytics.',
    longDescription: `
      Created a modern e-commerce platform from scratch with focus on performance,
      user experience, and scalability. The platform features advanced product search,
      real-time inventory management, and comprehensive analytics dashboard.

      Key features implemented:
      - Advanced product filtering and search with Elasticsearch
      - Real-time inventory synchronization
      - Multi-vendor marketplace capabilities
      - Comprehensive admin dashboard with real-time metrics
    `,
    category: 'web',
    status: 'completed',
    featured: true,
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Elasticsearch', 'PostgreSQL', 'Redis', 'Docker'],
    images: {
      thumbnail: '/images/projects/ecommerce/thumbnail.jpg',
      featured: '/images/projects/ecommerce/featured.jpg',
      screenshots: [
        '/images/projects/ecommerce/screenshot1.jpg',
        '/images/projects/ecommerce/screenshot2.jpg',
        '/images/projects/ecommerce/screenshot3.jpg',
      ],
    },
    links: {
      demo: 'https://shop-modern.karpov.dev',
      github: 'https://github.com/karpovpw/ecommerce-platform',
    },
    metrics: {
      users: 10000,
      performance: '2.1s average load time',
      impact: '150% conversion increase',
    },
    startDate: '2023-03-01',
    endDate: '2023-07-30',
    teamSize: 6,
    role: 'Full Stack Developer & Technical Lead',
  },
  {
    id: 'mobile-fitness-app',
    title: 'Fitness Tracking Mobile App',
    slug: 'mobile-fitness-app',
    description: 'Cross-platform mobile application for fitness tracking with social features and gamification.',
    longDescription: `
      Developed a comprehensive fitness tracking mobile application with social features,
      workout planning, and progress visualization. The app includes offline capability,
      health data integration, and engaging gamification elements.

      Notable achievements:
      - 98% crash-free sessions on both platforms
      - Integrated with HealthKit and Google Fit
      - Advanced workout recommendation algorithm
      - Real-time social features with WebSocket
    `,
    category: 'mobile',
    status: 'completed',
    featured: false,
    technologies: ['React Native', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io', 'HealthKit'],
    images: {
      thumbnail: '/images/projects/fitness-app/thumbnail.jpg',
      featured: '/images/projects/fitness-app/featured.jpg',
      screenshots: [
        '/images/projects/fitness-app/screenshot1.jpg',
        '/images/projects/fitness-app/screenshot2.jpg',
      ],
    },
    links: {
      demo: 'https://apps.apple.com/app/fitness-tracker/id1234567890',
      github: 'https://github.com/karpovpw/fitness-app',
    },
    metrics: {
      users: 5000,
      performance: '98% crash-free',
      impact: '85% user retention',
    },
    startDate: '2022-11-01',
    endDate: '2023-04-15',
    teamSize: 3,
    role: 'Mobile Developer & Backend Engineer',
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    slug: 'nft-marketplace',
    description: 'Full-featured NFT marketplace with auction system, creator tools, and secondary market.',
    longDescription: `
      Built a comprehensive NFT marketplace supporting multiple blockchains with
      advanced features including Dutch auctions, creator royalties, and secondary
      market trading. The platform includes social features and creator verification.

      Technical highlights:
      - Multi-chain NFT support (Ethereum, Polygon, BSC)
      - Advanced auction mechanisms with gas optimization
      - Creator dashboard with analytics and royalty management
      - Social features with following and collections
    `,
    category: 'crypto',
    status: 'completed',
    featured: true,
    technologies: ['React', 'Web3.js', 'Solidity', 'IPFS', 'The Graph', 'OpenSea API'],
    images: {
      thumbnail: '/images/projects/nft-marketplace/thumbnail.jpg',
      featured: '/images/projects/nft-marketplace/featured.jpg',
      screenshots: [
        '/images/projects/nft-marketplace/screenshot1.jpg',
        '/images/projects/nft-marketplace/screenshot2.jpg',
        '/images/projects/nft-marketplace/screenshot3.jpg',
      ],
    },
    links: {
      demo: 'https://nft-market.karpov.dev',
      github: 'https://github.com/karpovpw/nft-marketplace',
    },
    metrics: {
      users: 15000,
      performance: '$2M+ trading volume',
      impact: '10K+ NFTs traded',
    },
    startDate: '2022-06-01',
    endDate: '2022-10-30',
    teamSize: 4,
    role: 'Full Stack Developer & Blockchain Engineer',
  },
  {
    id: 'real-estate-platform',
    title: 'Real Estate Platform',
    slug: 'real-estate-platform',
    description: 'Modern real estate platform with virtual tours, AI-powered recommendations, and CRM integration.',
    longDescription: `
      Developed a comprehensive real estate platform featuring virtual property tours,
      AI-powered property recommendations, and integrated CRM system. The platform
      serves both property seekers and real estate agents with advanced search and
      management capabilities.

      Key innovations:
      - AI-powered property recommendation engine
      - 360° virtual tour integration with hotspot navigation
      - Real-time chat system between agents and clients
      - Advanced analytics dashboard for market insights
    `,
    category: 'web',
    status: 'completed',
    featured: false,
    technologies: ['Next.js', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL', 'Three.js'],
    images: {
      thumbnail: '/images/projects/real-estate/thumbnail.jpg',
      featured: '/images/projects/real-estate/featured.jpg',
      screenshots: [
        '/images/projects/real-estate/screenshot1.jpg',
        '/images/projects/real-estate/screenshot2.jpg',
      ],
    },
    links: {
      demo: 'https://real-estate-platform.karpov.dev',
      github: 'https://github.com/karpovpw/real-estate-platform',
    },
    metrics: {
      users: 8000,
      performance: 'Sub-2s page loads',
      impact: '200% lead conversion',
    },
    startDate: '2022-01-15',
    endDate: '2022-05-30',
    teamSize: 7,
    role: 'Senior Full Stack Developer',
  },
]

// Utility functions for project filtering and sorting
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter(project => project.featured)
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return PROJECTS.filter(project => project.category === category)
}

export function getProjectsByTechnology(technology: string): Project[] {
  return PROJECTS.filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  )
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(project => project.slug === slug)
}

export function getAllTechnologies(): string[] {
  const technologies = new Set<string>()
  PROJECTS.forEach(project => {
    project.technologies.forEach(tech => technologies.add(tech))
  })
  return Array.from(technologies).sort()
}

export function getAllCategories(): Project['category'][] {
  const categories = new Set<Project['category']>()
  PROJECTS.forEach(project => categories.add(project.category))
  return Array.from(categories)
}

// Sort projects by featured status and date
export function getSortedProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    // Then by end date (newest first)
    if (a.endDate && b.endDate) {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    }

    return 0
  })
}