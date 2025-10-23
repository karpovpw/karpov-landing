import { Article } from '@/types'

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Building Multi-Agent Systems with BMAD Framework',
    content: `# Building Multi-Agent Systems with BMAD Framework

## Introduction

The BMAD (Business Management and Automation Development) framework represents a paradigm shift in how we approach complex software development projects. By leveraging multi-agent systems, BMAD enables autonomous coordination between different development workflows.

## Core Concepts

### Agent Architecture
Each agent in the BMAD system is designed with specific responsibilities:
- **Planning Agent**: Handles project requirements and task decomposition
- **Development Agent**: Manages code generation and implementation
- **Testing Agent**: Ensures quality through automated testing
- **Deployment Agent**: Handles production deployment and monitoring

### Communication Protocols
Agents communicate through standardized protocols that ensure:
- Reliable message delivery
- State synchronization
- Error handling and recovery

## Implementation Example

\`\`\`typescript
import { BMADAgent, AgentMessage } from '@bmad/core'

class DevelopmentAgent extends BMADAgent {
  async processMessage(message: AgentMessage) {
    if (message.type === 'CODE_GENERATION') {
      const code = await this.generateCode(message.payload)
      return this.sendToNextAgent('TESTING', { code })
    }
  }
}
\`\`\`

## Benefits

1. **Scalability**: Handle complex projects with multiple parallel workflows
2. **Reliability**: Built-in error recovery and state management
3. **Efficiency**: Automated coordination reduces manual overhead
4. **Quality**: Consistent testing and validation across all components

## Conclusion

BMAD framework represents the future of collaborative software development, where AI agents work together seamlessly to deliver high-quality solutions.`,
    excerpt: 'Explore how the BMAD framework revolutionizes software development through intelligent multi-agent systems that coordinate complex workflows autonomously.',
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-15',
    tags: ['BMAD', 'Multi-Agent Systems', 'AI', 'Software Architecture'],
    readingTime: 5,
    category: 'bmad',
  },
  {
    id: '2',
    title: 'Smart Contract Security Best Practices',
    content: `# Smart Contract Security Best Practices

## Introduction

Security in blockchain applications is paramount. This article covers essential security practices for developing robust smart contracts.

## Common Vulnerabilities

### Reentrancy Attacks
Always follow the checks-effects-interactions pattern:

\`\`\`solidity
function withdraw() external {
    uint amount = balances[msg.sender];
    require(amount > 0, "Insufficient balance");

    balances[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
}
\`\`\`

### Integer Overflow
Use SafeMath or Solidity 0.8+ built-in overflow checks.

## Security Tools

- **Slither**: Static analysis for Solidity
- **Mythril**: Security analysis tool
- **Echidna**: Property-based testing

## Best Practices

1. **Code Reviews**: Always have multiple developers review contracts
2. **Testing**: Comprehensive unit and integration tests
3. **Audits**: Professional security audits before deployment
4. **Monitoring**: Post-deployment monitoring and incident response

## Conclusion

Security is an ongoing process that requires vigilance and continuous improvement.`,
    excerpt: 'Learn essential security practices for developing secure smart contracts, including common vulnerabilities and prevention strategies.',
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-10',
    tags: ['Blockchain', 'Security', 'Smart Contracts', 'Solidity'],
    readingTime: 7,
    category: 'blockchain',
  },
  {
    id: '3',
    title: 'Modern React Architecture Patterns',
    content: `# Modern React Architecture Patterns

## Introduction

React has evolved significantly, and with it, the patterns we use to build scalable applications. This article explores modern architectural approaches.

## Component Architecture

### Atomic Design
Break down components into atoms, molecules, organisms, templates, and pages.

### Custom Hooks
Extract reusable logic into custom hooks:

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
\`\`\`

## State Management

### Context vs Redux
Choose the right tool for your use case:
- **Context**: Simple state sharing between components
- **Redux**: Complex state management with middleware
- **Zustand**: Lightweight alternative to Redux

## Performance Optimization

1. **React.memo**: Prevent unnecessary re-renders
2. **useMemo**: Memoize expensive computations
3. **useCallback**: Memoize function references
4. **Code Splitting**: Lazy load components

## Conclusion

Modern React development requires understanding both the library and the ecosystem of tools and patterns available.`,
    excerpt: 'Discover modern React architecture patterns including atomic design, custom hooks, state management strategies, and performance optimization techniques.',
    publishedAt: '2025-01-05',
    updatedAt: '2025-01-05',
    tags: ['React', 'Architecture', 'JavaScript', 'Performance'],
    readingTime: 6,
    category: 'architecture',
  },
  {
    id: '4',
    title: 'Getting Started with TypeScript',
    content: `# Getting Started with TypeScript

## Introduction

TypeScript adds static typing to JavaScript, making your code more robust and maintainable. This tutorial covers the basics.

## Why TypeScript?

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Documentation**: Types serve as inline documentation
- **Scalability**: Easier to maintain large codebases

## Basic Types

\`\`\`typescript
// Basic types
let name: string = "John"
let age: number = 30
let isActive: boolean = true

// Arrays
let numbers: number[] = [1, 2, 3]
let names: Array<string> = ["John", "Jane"]

// Objects
interface User {
  name: string
  age: number
  email?: string
}

let user: User = {
  name: "John",
  age: 30,
  email: "john@example.com"
}
\`\`\`

## Functions

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`
}

const add = (a: number, b: number): number => a + b
\`\`\`

## Advanced Types

### Union Types
\`\`\`typescript
type Status = 'loading' | 'success' | 'error'
let status: Status = 'loading'
\`\`\`

### Generic Types
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg
}
\`\`\`

## Conclusion

TypeScript is a powerful tool that enhances JavaScript development. Start with basic types and gradually adopt more advanced features as your project grows.`,
    excerpt: 'Learn the fundamentals of TypeScript, from basic types and interfaces to advanced features like generics and union types.',
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-01',
    tags: ['TypeScript', 'JavaScript', 'Tutorial', 'Programming'],
    readingTime: 4,
    category: 'tutorials',
  },
]

export const ARTICLE_CATEGORIES = [
  { value: 'all', label: 'All Articles' },
  { value: 'bmad', label: 'BMAD' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'tutorials', label: 'Tutorials' },
]