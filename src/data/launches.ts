export type Category =
  | 'Model'
  | 'Product'
  | 'Developer'
  | 'Enterprise'
  | 'Integration'
  | 'Research'
  | 'Safety'

export interface Launch {
  id: string
  date: string // ISO
  name: string
  category: Category
  summary: string
  details?: string
  tag?: string
}

export const LAUNCHES: Launch[] = [
  // January
  {
    id: 'claude-cowork',
    date: '2026-01-12',
    name: 'Claude Cowork',
    category: 'Product',
    tag: 'Research Preview',
    summary: 'Agentic "computer agent" for non-technical knowledge workers.',
    details:
      'Brings Claude Code-style autonomy to desktop productivity tasks. Launched in research preview for Pro and Max users.',
  },
  {
    id: 'opus-4-6',
    date: '2026-01-28',
    name: 'Claude Opus 4.6',
    category: 'Model',
    tag: 'Flagship',
    summary: 'Stronger coding, better planning/debugging, #1 on Finance Agent benchmark.',
    details:
      '14.5-hour task completion time horizon. Also the intelligence layer behind Claude\'s multi-agent "team" features.',
  },

  // February
  {
    id: 'code-security',
    date: '2026-02-20',
    name: 'Claude Code Security',
    category: 'Developer',
    tag: 'Security',
    summary: 'Reasoning-based scanner for finding zero-day vulnerabilities.',
    details:
      'Frontier Red Team used it to find 500+ vulnerabilities in production open-source code.',
  },
  {
    id: 'nasa-perseverance',
    date: '2026-02-04',
    name: 'NASA Perseverance Integration',
    category: 'Integration',
    tag: 'Mars',
    summary: 'First AI-assisted drive on another planet.',
    details:
      'Claude helped the Perseverance rover travel 400 meters on Mars — the first AI-assisted planetary drive.',
  },

  // March
  {
    id: 'cowork-plugins-enterprise',
    date: '2026-03-01',
    name: 'Cowork & Plugins for Enterprise',
    category: 'Enterprise',
    tag: 'GA',
    summary: 'Claude embedded in Excel, PowerPoint, Slack, Gmail, Drive, DocuSign.',
  },
  {
    id: 'cowork-ga',
    date: '2026-03-05',
    name: 'Cowork GA (macOS & Windows)',
    category: 'Product',
    tag: 'GA',
    summary: 'Cowork goes GA with Analytics API, OpenTelemetry, and RBAC.',
    details: 'Role-based access controls for Enterprise plans.',
  },
  {
    id: 'plugin-marketplace',
    date: '2026-03-10',
    name: 'Plugin Marketplace',
    category: 'Enterprise',
    summary: 'Admin controls for Team and Enterprise plans.',
  },
  {
    id: 'scheduled-tasks',
    date: '2026-03-12',
    name: 'Scheduled & Recurring Tasks',
    category: 'Product',
    summary: 'Set Cowork to run tasks on a schedule.',
  },
  {
    id: 'customize-section',
    date: '2026-03-14',
    name: 'Customize Section in Claude Desktop',
    category: 'Product',
    summary: 'Personalize Claude Desktop behavior and shortcuts.',
  },
  {
    id: 'inline-charts',
    date: '2026-03-17',
    name: 'Custom Charts & Inline Visualizations',
    category: 'Product',
    summary: 'Live charts rendered directly in chat responses.',
  },
  {
    id: 'interactive-apps',
    date: '2026-03-20',
    name: 'Interactive Apps on Mobile',
    category: 'Product',
    tag: 'iOS / Android',
    summary: 'Live charts, diagrams, and shareable visuals in the mobile app.',
  },
  {
    id: 'computer-use-cowork',
    date: '2026-03-22',
    name: 'Computer Use in Cowork & Claude Code',
    category: 'Developer',
    summary: 'Computer-use plus Dispatch improvements for Pro and Max.',
  },
  {
    id: 'persistent-threads',
    date: '2026-03-24',
    name: 'Persistent Agent Threads',
    category: 'Product',
    summary: 'Manage Cowork tasks from Desktop, iOS, and Android.',
  },
  {
    id: 'mythos-preview',
    date: '2026-03-26',
    name: 'Claude Mythos Preview',
    category: 'Research',
    tag: 'Invite-only',
    summary: 'Gated research preview for defensive cybersecurity (Project Glasswing).',
  },
  {
    id: 'bedrock-messages-api',
    date: '2026-03-30',
    name: 'Messages API on Amazon Bedrock',
    category: 'Developer',
    tag: 'Research Preview',
    summary: 'First-party-compatible Messages API endpoint on Bedrock.',
  },

  // April
  {
    id: 'opus-4-7',
    date: '2026-04-16',
    name: 'Claude Opus 4.7',
    category: 'Model',
    tag: 'Flagship',
    summary: '64.3% on SWE-Bench Pro — ~10pts above Opus 4.6.',
    details:
      'Improved Terminal-Bench 2.0, visual reasoning gains, and API effort-level controls.',
  },
  {
    id: 'claude-design',
    date: '2026-04-17',
    name: 'Claude Design',
    category: 'Product',
    tag: 'Research Preview',
    summary: 'Prototypes, slides, one-pagers, and visuals — powered by Opus 4.7.',
    details:
      'Can read a company\'s codebase and design files to apply their design system. Available for Pro, Max, Team, and Enterprise.',
  },
  {
    id: 'managed-agents',
    date: '2026-04-17',
    name: 'Claude Managed Agents',
    category: 'Developer',
    tag: 'Public Beta',
    summary: 'Fully managed agent harness with secure sandboxing and SSE streaming.',
  },
  {
    id: 'ant-cli',
    date: '2026-04-17',
    name: 'ant CLI',
    category: 'Developer',
    summary: 'Command-line client for the Claude API with native Claude Code integration.',
    details: 'YAML-based resource versioning.',
  },
  {
    id: 'advisor-tool',
    date: '2026-04-17',
    name: 'Advisor Tool',
    category: 'Developer',
    tag: 'Public Beta',
    summary: 'Faster executor + higher-intelligence advisor for long-horizon agents.',
    details: 'Reduces cost on long agentic workloads.',
  },
]
