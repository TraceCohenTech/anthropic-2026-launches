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
  howItWorks?: string
  competitors?: string[]
  useCases?: string[]
  impact?: string
  pricing?: string
  availability?: string
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
    howItWorks:
      'Cowork runs as a background agent on macOS and Windows that controls a sandboxed virtual desktop. It uses Opus 4.6\'s computer-use capability to click, type, and navigate across Excel, Slides, browsers, and any app you can see — while you keep working on your real machine. Tasks stream back into Claude chat with screenshots and a step-by-step trail you can pause or rewind.',
    competitors: ['OpenAI Operator', 'Google Mariner', 'Microsoft Copilot Actions', 'Rabbit R1'],
    useCases: [
      'Build financial models and pitch decks end-to-end',
      'Audit a spreadsheet for formula errors and rewrite it',
      'Pull research from 30 tabs into a single brief',
      'Fill out forms and internal tools a human usually touches',
    ],
    impact: 'Early Pro users report 3–6 hours of reclaimed focus time per week on repetitive desktop work.',
    availability: 'Research preview for Claude Pro ($20/mo) and Max ($100–200/mo).',
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
    howItWorks:
      'Opus 4.6 is a post-trained successor to 4.5 with a much longer usable context horizon — it stays coherent on single tasks for up to ~14.5 hours of agentic execution. Big gains come from a new planning head that decomposes goals into checkpointed subtasks, plus better tool-call selection that reduces wasted steps by ~30%.',
    competitors: ['GPT-5.1', 'Gemini 3 Pro', 'DeepSeek R2', 'xAI Grok 4'],
    useCases: [
      'Long-running coding agents that own a full feature',
      'Financial research agents (Finance Agent #1)',
      'Multi-step data analysis and ETL',
      'Multi-agent "team" orchestration in Cowork',
    ],
    impact: '#1 on Finance Agent benchmark. ~10pt jump over Opus 4.5 on long-horizon agentic evals.',
    pricing: 'Same API pricing as Opus 4.5 — $15/$75 per 1M input/output tokens.',
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
    howItWorks:
      'Instead of pattern-matching on known CVE signatures, Code Security runs an Opus 4.6 agent over a repository that reasons about intent, threat models a function\'s role, and then tries to construct a concrete exploit. Every finding ships with a proof-of-concept payload and a suggested patch — not just a warning.',
    competitors: ['GitHub Advanced Security / CodeQL', 'Snyk', 'Semgrep', 'Socket', 'Checkmarx'],
    useCases: [
      'Pre-release audit of open-source dependencies',
      'Continuous scanning in CI for regressions',
      'Red-team engagements against internal codebases',
      'Triage and prioritize a backlog of Dependabot alerts',
    ],
    impact: 'Anthropic\'s Frontier Red Team found 500+ real vulnerabilities in production OSS, including 10+ critical zero-days.',
    availability: 'Available to Claude Code Enterprise customers.',
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
    howItWorks:
      'JPL engineers deployed a specialized Claude model onto the ground-station planning pipeline. Claude ingests rover telemetry, hazard-cam imagery, and terrain models, then proposes drive plans that human engineers review before uplink. The same loop handles arm placements for sample caching.',
    competitors: ['IBM Watson (prior JPL work)', 'Google DeepMind x NASA collaborations', 'In-house JPL planners'],
    useCases: [
      'Rover path planning over hazardous terrain',
      'Sample-tube caching arm motions',
      'Overnight drive sequencing',
      'Hazard triage from orbital imagery',
    ],
    impact: '400m drive — the longest single-sol traverse of the mission, ~2× the manual-planning average.',
  },

  // March
  {
    id: 'cowork-plugins-enterprise',
    date: '2026-03-01',
    name: 'Cowork & Plugins for Enterprise',
    category: 'Enterprise',
    tag: 'GA',
    summary: 'Claude embedded in Excel, PowerPoint, Slack, Gmail, Drive, DocuSign.',
    howItWorks:
      'Each plugin is a thin OAuth connector that hands Claude a scoped capability surface (read cells, write slides, send DMs). Admins pick which plugins a user or group can invoke. All actions are logged to the Analytics API and OpenTelemetry feed for audit.',
    competitors: ['Microsoft Copilot for Microsoft 365', 'Google Workspace Gemini', 'Glean', 'Writer'],
    useCases: [
      'Draft a board deck in PowerPoint from a data room',
      'Auto-summarize Slack channels into a weekly digest',
      'Fill a CRM from inbound Gmail threads',
      'Flag anomalies in a financial model in Excel',
    ],
    availability: 'Claude Team and Enterprise plans.',
  },
  {
    id: 'cowork-ga',
    date: '2026-03-05',
    name: 'Cowork GA (macOS & Windows)',
    category: 'Product',
    tag: 'GA',
    summary: 'Cowork goes GA with Analytics API, OpenTelemetry, and RBAC.',
    details: 'Role-based access controls for Enterprise plans.',
    howItWorks:
      'GA adds three enterprise pillars on top of the research preview: an Analytics API (per-user/per-task usage + success rate), OpenTelemetry spans for every agent step, and RBAC so admins can restrict which apps, files, and plugins an agent can touch.',
    competitors: ['OpenAI Operator', 'Google Project Mariner', 'Adept'],
    useCases: [
      'Enterprise deployment with per-team governance',
      'SOC 2-ready telemetry pipelines',
      'Custom dashboards on agent ROI',
    ],
  },
  {
    id: 'plugin-marketplace',
    date: '2026-03-10',
    name: 'Plugin Marketplace',
    category: 'Enterprise',
    summary: 'Admin controls for Team and Enterprise plans.',
    howItWorks:
      'A curated catalog of first- and third-party plugins. Admins can allow-list, version-pin, and review permissions scope before rollout. Developers ship plugins via a signed manifest with declared scopes and review SLAs.',
    competitors: ['OpenAI GPT Store', 'Microsoft Copilot Studio marketplace', 'Zapier'],
    useCases: [
      'Centralized IT governance of Claude integrations',
      'Third-party data connector distribution',
      'Internal plugins for proprietary systems',
    ],
  },
  {
    id: 'scheduled-tasks',
    date: '2026-03-12',
    name: 'Scheduled & Recurring Tasks',
    category: 'Product',
    summary: 'Set Cowork to run tasks on a schedule.',
    howItWorks:
      'Cron-style scheduling inside Claude chat — you describe a task in natural language ("every Monday 7am pull competitor pricing and post to #market"), and Cowork materializes it as a recurring job with versioned prompts and a run history.',
    competitors: ['Zapier', 'Make.com', 'n8n', 'ChatGPT Tasks'],
    useCases: [
      'Morning news briefings',
      'Weekly KPI rollups into Slack',
      'Scheduled data-quality checks',
      'Recurring outreach or follow-ups',
    ],
  },
  {
    id: 'customize-section',
    date: '2026-03-14',
    name: 'Customize Section in Claude Desktop',
    category: 'Product',
    summary: 'Personalize Claude Desktop behavior and shortcuts.',
    howItWorks:
      'A settings pane where users define per-workspace system prompts, preferred tools, keyboard shortcuts, and default models. Profiles sync across devices signed in with the same Claude account.',
    useCases: [
      'Personal writing voice defaults',
      'Per-project coding conventions',
      'Custom shortcut keys for power users',
    ],
  },
  {
    id: 'inline-charts',
    date: '2026-03-17',
    name: 'Custom Charts & Inline Visualizations',
    category: 'Product',
    summary: 'Live charts rendered directly in chat responses.',
    howItWorks:
      'Claude now emits structured chart specs (line, bar, scatter, geo) that render as interactive Recharts-style components inside the message. Users can hover for tooltips, toggle series, and export as PNG or CSV without leaving the thread.',
    competitors: ['ChatGPT Advanced Data Analysis', 'Gemini Charts', 'Julius.ai'],
    useCases: [
      'Ad-hoc data exploration from a CSV upload',
      'Financial modeling outputs inline',
      'Sharing dashboards with non-technical teammates',
    ],
  },
  {
    id: 'interactive-apps',
    date: '2026-03-20',
    name: 'Interactive Apps on Mobile',
    category: 'Product',
    tag: 'iOS / Android',
    summary: 'Live charts, diagrams, and shareable visuals in the mobile app.',
    howItWorks:
      'The chart-rendering layer was ported to native iOS and Android views, so generated visualizations are fully interactive on phone — with AirDrop / share-sheet export, full-screen pinch-to-zoom, and dark-mode-aware palettes.',
    competitors: ['ChatGPT mobile', 'Gemini mobile', 'Perplexity mobile'],
    useCases: [
      'Review dashboards on the go',
      'Share a generated chart directly via iMessage/WhatsApp',
      'Field research with live data viz',
    ],
  },
  {
    id: 'computer-use-cowork',
    date: '2026-03-22',
    name: 'Computer Use in Cowork & Claude Code',
    category: 'Developer',
    summary: 'Computer-use plus Dispatch improvements for Pro and Max.',
    howItWorks:
      'Computer-use is now a first-class primitive inside Cowork and Claude Code. The new Dispatch engine routes any sub-task that needs a GUI (e.g. clicking through a legacy admin panel) to a sandboxed VM and streams results back into the agent loop, so coding agents can now "reach out" into tools that only have a UI.',
    competitors: ['OpenAI Operator', 'Google Mariner', 'Browser Use / Browserbase'],
    useCases: [
      'Scraping data from dashboards with no API',
      'Automating SaaS tools inside a coding task',
      'Running visual regression tests',
    ],
  },
  {
    id: 'persistent-threads',
    date: '2026-03-24',
    name: 'Persistent Agent Threads',
    category: 'Product',
    summary: 'Manage Cowork tasks from Desktop, iOS, and Android.',
    howItWorks:
      'Every Cowork job becomes a persistent thread with a stable ID, live status, and a chat you can DM the agent inside. Threads sync across Desktop, iOS, and Android with push notifications on completion, error, or an approval request.',
    useCases: [
      'Kick off a task on desktop, check it from your phone',
      'Approve a sensitive step from anywhere',
      'Hand off long-running research between sessions',
    ],
  },
  {
    id: 'mythos-preview',
    date: '2026-03-26',
    name: 'Claude Mythos Preview',
    category: 'Research',
    tag: 'Invite-only',
    summary: 'Gated research preview for defensive cybersecurity (Project Glasswing).',
    howItWorks:
      'Mythos is an agent specialized on defensive security — threat hunting, malware reversing, incident response. It runs under a stricter policy framework than general-purpose Claude and is only made available to vetted security organizations under Project Glasswing.',
    competitors: ['Google Sec-PaLM / Gemini Security', 'Microsoft Security Copilot', 'CrowdStrike Charlotte AI'],
    useCases: [
      'SOC alert triage and narrative generation',
      'Malware reverse engineering',
      'IR timeline reconstruction',
    ],
    availability: 'Invite-only for qualifying security teams and national labs.',
  },
  {
    id: 'bedrock-messages-api',
    date: '2026-03-30',
    name: 'Messages API on Amazon Bedrock',
    category: 'Developer',
    tag: 'Research Preview',
    summary: 'First-party-compatible Messages API endpoint on Bedrock.',
    howItWorks:
      'AWS customers can now hit Anthropic\'s Messages API directly through Bedrock with 1:1 request/response parity — including tool use, vision, and streaming — without rewriting client code. Billing, IAM, and VPC-routing flow through AWS.',
    competitors: ['AWS Bedrock Converse API', 'Azure OpenAI', 'Google Vertex AI'],
    useCases: [
      'Enterprises standardized on AWS who want Claude natively',
      'Regulated industries needing VPC isolation',
      'Lift-and-shift from Anthropic direct API',
    ],
    availability: 'Research preview in us-east-1 and us-west-2.',
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
    howItWorks:
      'Opus 4.7 introduces an "effort level" parameter in the API (low / medium / high / max) that lets developers trade latency for thoroughness per request. The model has a retrained visual tower — big gains on chart reading and UI understanding — and a sharper terminal-skills curriculum pushing Terminal-Bench 2.0 to state of the art.',
    competitors: ['GPT-5.1', 'Gemini 3 Ultra', 'DeepSeek R2', 'Grok 4'],
    useCases: [
      'Long-horizon coding agents',
      'UI automation with vision',
      'Complex spreadsheet and chart analysis',
      'Production agents where per-request effort tuning matters',
    ],
    impact: '64.3% on SWE-Bench Pro (+10pt vs 4.6). New SOTA on Terminal-Bench 2.0.',
    pricing: 'Same list price as Opus 4.6; effort=low can cut cost 40–60% on easier turns.',
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
    howItWorks:
      'Claude Design ingests your repo, Figma file, or a brand kit, extracts the design tokens (colors, spacing, type scale, component patterns), and then produces prototypes, slides, one-pagers, and marketing visuals that actually respect your system. Output is editable in Figma, exportable to React/HTML, or shareable as a link.',
    competitors: ['Figma Make', 'Canva Magic Design', 'Galileo AI', 'v0 by Vercel', 'Framer AI'],
    useCases: [
      'Generate a pitch deck that matches your brand',
      'Spin up a marketing one-pager in minutes',
      'Prototype a UI flow that uses your component library',
      'Auto-produce social assets in brand',
    ],
    availability: 'Claude Pro, Max, Team, and Enterprise.',
  },
  {
    id: 'managed-agents',
    date: '2026-04-17',
    name: 'Claude Managed Agents',
    category: 'Developer',
    tag: 'Public Beta',
    summary: 'Fully managed agent harness with secure sandboxing and SSE streaming.',
    howItWorks:
      'Anthropic now operates the agent loop for you: sandboxed VMs per run, automatic file and tool mounting, resumable state, and an SSE stream you can pipe straight into your frontend. You ship a system prompt + tool set; Anthropic handles isolation, scaling, and observability.',
    competitors: ['OpenAI Assistants API', 'LangGraph Platform', 'CrewAI Enterprise', 'E2B'],
    useCases: [
      'Ship agentic features without running infra',
      'Per-user isolated sandboxes',
      'Resumable long-running jobs',
      'Real-time streaming agent UX',
    ],
    availability: 'Public beta on the Claude API.',
  },
  {
    id: 'ant-cli',
    date: '2026-04-17',
    name: 'ant CLI',
    category: 'Developer',
    summary: 'Command-line client for the Claude API with native Claude Code integration.',
    details: 'YAML-based resource versioning.',
    howItWorks:
      '`ant` is a first-party CLI that wraps every Claude API surface — messages, agents, skills, files, prompts — with YAML-defined resources you can `ant apply` like kubectl. It diffs against the deployed state, plugs into CI/CD, and shares auth with Claude Code.',
    competitors: ['OpenAI CLI', 'Cohere CLI', 'Hugging Face CLI', 'Homegrown scripts'],
    useCases: [
      'GitOps-style management of prompts and agents',
      'CI/CD pipelines that deploy Claude resources',
      'Quick scripting against the API from a terminal',
    ],
  },
  {
    id: 'advisor-tool',
    date: '2026-04-17',
    name: 'Advisor Tool',
    category: 'Developer',
    tag: 'Public Beta',
    summary: 'Faster executor + higher-intelligence advisor for long-horizon agents.',
    details: 'Reduces cost on long agentic workloads.',
    howItWorks:
      'A two-model pattern built into the API: a fast, cheap executor handles the bulk of steps, and calls out to a higher-intelligence "advisor" (Opus 4.7) only when it hits a decision it isn\'t confident on. Anthropic manages the escalation policy so you don\'t have to build it.',
    competitors: ['Custom router frameworks (LangGraph, DSPy)', 'OpenAI model routing', 'Hybrid model setups'],
    useCases: [
      'Cost-optimize long agent runs',
      'Route hard decisions to the strongest model without paying Opus on every turn',
      'Predictable latency on large task graphs',
    ],
    impact: 'Early users report 40–70% cost reduction on multi-hour agent workloads with no quality loss.',
    availability: 'Public beta on the Claude API.',
  },
]
