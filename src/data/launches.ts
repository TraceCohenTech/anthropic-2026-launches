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
  // ========== 2025 ==========
  {
    id: 'citations-2025',
    date: '2025-01-23',
    name: 'Citations API',
    category: 'Developer',
    summary: 'Auto-ground Claude responses in source docs with verifiable citations.',
    howItWorks:
      'You attach source documents to a Messages API call; Claude returns responses where every claim is tagged with the specific sentence or block it came from. Hallucination drops meaningfully because fabricating a citation is harder than fabricating a claim.',
    competitors: ['OpenAI file search', 'Perplexity API', 'Cohere RAG', 'LlamaIndex'],
    useCases: ['Legal and research agents', 'Customer support grounded in docs', 'Compliance responses'],
    impact: 'Reduced hallucinated facts by ~30% in Anthropic internal evals.',
  },
  {
    id: 'claude-3-7-sonnet',
    date: '2025-02-24',
    name: 'Claude 3.7 Sonnet',
    category: 'Model',
    tag: 'Flagship',
    summary: 'First hybrid reasoning model — toggle extended thinking on demand.',
    howItWorks:
      '3.7 Sonnet introduced the "extended thinking" mode: the model can reason through a problem with a controllable budget of thinking tokens before answering. Developers choose per-request whether to use it and how much budget to grant.',
    competitors: ['OpenAI o3-mini', 'DeepSeek R1', 'Gemini 2.0 Flash Thinking', 'Grok 3'],
    useCases: ['Math and coding', 'Complex multi-step agents', 'Long-horizon planning'],
    impact: 'SOTA on SWE-bench Verified at launch (70.3%).',
    pricing: '$3 / $15 per 1M input/output tokens.',
  },
  {
    id: 'claude-code-preview',
    date: '2025-02-24',
    name: 'Claude Code (Research Preview)',
    category: 'Developer',
    tag: 'Research Preview',
    summary: 'Agentic CLI that writes, debugs, and commits code end-to-end.',
    howItWorks:
      'A terminal-first agent that runs inside your repo, can read files, write patches, run tests, commit to git, and open PRs — using 3.7 Sonnet\'s extended thinking when it gets stuck.',
    competitors: ['Cursor', 'GitHub Copilot CLI', 'Aider', 'Devin', 'Cline'],
    useCases: ['Refactoring', 'Bug fixing', 'New feature scaffolding', 'Test generation'],
    availability: 'Research preview, npm install -g @anthropic-ai/claude-code.',
  },
  {
    id: 'claude-for-education',
    date: '2025-04-02',
    name: 'Claude for Education',
    category: 'Enterprise',
    summary: 'Campus-wide Claude for Northeastern, LSE, and Champlain College.',
    howItWorks:
      'Enterprise-grade Claude with a "Learning mode" system prompt that guides students through Socratic questioning instead of giving answers. Includes SSO, admin console, and usage analytics.',
    competitors: ['OpenAI for Education / ChatGPT Edu', 'Google Gemini for Education', 'Khanmigo'],
    useCases: ['Tutoring across disciplines', 'Writing feedback', 'Research assistance'],
    impact: 'First AI partnership at the scale of an entire university system.',
  },
  {
    id: 'claude-max',
    date: '2025-04-09',
    name: 'Claude Max',
    category: 'Product',
    summary: 'New $100 / $200 tier for power users hitting Pro rate limits.',
    howItWorks:
      '5× and 20× the usage of Pro, priority capacity during peak load, and first access to new features. Designed for researchers and engineers running Claude Code and agents all day.',
    competitors: ['ChatGPT Pro ($200)', 'Gemini Advanced', 'Perplexity Max'],
    pricing: '$100/mo or $200/mo.',
  },
  {
    id: 'claude-research',
    date: '2025-04-15',
    name: 'Research',
    category: 'Product',
    summary: 'Agentic multi-source research inside Claude.ai.',
    howItWorks:
      'Claude spawns sub-agents that search the web, your Google Workspace, and connected apps in parallel, then synthesizes findings into a sourced report over 5–45 minutes.',
    competitors: ['ChatGPT Deep Research', 'Gemini Deep Research', 'Perplexity Deep Research'],
    useCases: ['Market and competitive research', 'Due diligence', 'Literature reviews'],
  },
  {
    id: 'integrations',
    date: '2025-05-01',
    name: 'Integrations (MCP connectors)',
    category: 'Integration',
    summary: 'Claude connects to Jira, Asana, Zapier, Intercom, Slack, and more.',
    howItWorks:
      'Remote MCP servers that Claude can attach to inside chat. OAuth once, then Claude can read/write across your tools in a single conversation.',
    competitors: ['ChatGPT Connectors', 'Glean', 'Zapier Central'],
    useCases: ['Pull tickets from Jira into a plan', 'Log decisions into Asana', 'Draft Intercom replies from knowledge bases'],
  },
  {
    id: 'claude-4',
    date: '2025-05-22',
    name: 'Claude 4 — Opus 4 & Sonnet 4',
    category: 'Model',
    tag: 'Flagship',
    summary: 'New flagship family: Opus 4 for long-horizon work, Sonnet 4 for everyday.',
    howItWorks:
      'Opus 4 runs 7-hour coding sessions autonomously; Sonnet 4 matches most of Opus 3.5\'s capability at Sonnet prices. Both support extended thinking, tool use during thinking, and parallel tool calls.',
    competitors: ['GPT-4.1', 'Gemini 2.5 Pro', 'DeepSeek V3', 'Grok 3'],
    useCases: ['Autonomous coding agents', 'Long-running research', 'High-volume production workloads'],
    impact: 'Opus 4 set SOTA on SWE-bench Verified (72.5%) and Terminal-bench.',
    pricing: 'Opus 4: $15 / $75 · Sonnet 4: $3 / $15 per 1M tokens.',
  },
  {
    id: 'claude-code-ga',
    date: '2025-05-22',
    name: 'Claude Code GA',
    category: 'Developer',
    tag: 'GA',
    summary: 'Claude Code exits beta with IDE, GitHub Actions, and SDK.',
    howItWorks:
      'GA ships VS Code and JetBrains extensions, a GitHub Actions runner that tags Claude on PRs, and a programmatic SDK so you can call the agent from your own tools.',
    competitors: ['Cursor', 'GitHub Copilot Workspace', 'Devin', 'Cline', 'Aider'],
    useCases: ['PR review and auto-fix', 'Feature implementation from specs', 'Codebase onboarding'],
  },
  {
    id: 'artifacts-apps',
    date: '2025-06-25',
    name: 'Artifacts that Build Apps',
    category: 'Product',
    summary: 'Share interactive Claude-built apps with a public link.',
    howItWorks:
      'Artifacts became full apps: Claude writes React, hosts it on Anthropic infra, and gives you a shareable URL. Recipients use YOUR Claude credits only when they interact with the AI inside.',
    competitors: ['ChatGPT Canvas share', 'v0 by Vercel', 'Lovable', 'Bolt.new'],
    useCases: ['Shareable calculators', 'Interactive one-pagers', 'Quick internal tools'],
  },
  {
    id: 'claude-gov',
    date: '2025-07-10',
    name: 'Claude Gov',
    category: 'Enterprise',
    summary: 'FedRAMP-ready Claude for U.S. national security customers.',
    howItWorks:
      'A dedicated model cluster plus product surface cleared for classified and controlled unclassified workloads, with higher language coverage on strategically important regions and dialects.',
    competitors: ['Palantir AIP', 'Microsoft Azure Gov OpenAI', 'Scale Donovan'],
  },
  {
    id: 'financial-solution',
    date: '2025-07-15',
    name: 'Claude Financial Analysis Solution',
    category: 'Enterprise',
    summary: 'Pre-built package for analysts: data connectors, models, prompts.',
    howItWorks:
      'Bundles Claude with pre-built connectors to Snowflake, Databricks, S&P Capital IQ, FactSet, PitchBook, Box — plus Claude Code + Enterprise admin controls tuned for financial-services compliance.',
    competitors: ['Bloomberg GPT', 'Hebbia', 'Rogo', 'AlphaSense'],
    useCases: ['Equity research', 'Due diligence', 'Earnings analysis'],
  },
  {
    id: 'claude-opus-4-1',
    date: '2025-08-05',
    name: 'Claude Opus 4.1',
    category: 'Model',
    summary: 'Drop-in upgrade for Opus 4: +2–3pt on coding, same price.',
    howItWorks:
      'A targeted post-training refresh focused on real-world agentic coding benchmarks. Same API and pricing as Opus 4 — flip the model name.',
    competitors: ['GPT-4.1', 'Gemini 2.5 Pro', 'DeepSeek V3.1'],
    impact: '74.5% on SWE-bench Verified.',
    pricing: '$15 / $75 per 1M tokens (same as Opus 4).',
  },
  {
    id: 'memory',
    date: '2025-08-12',
    name: 'Memory',
    category: 'Product',
    summary: 'Claude remembers context across conversations.',
    howItWorks:
      'Claude extracts durable facts (your projects, preferences, people you work with) into a memory store that persists across chats. You can view, edit, or clear it. Off by default on Team/Enterprise; admin-controllable.',
    competitors: ['ChatGPT Memory', 'Gemini memory', 'Pi by Inflection'],
    useCases: ['Long-running personal assistant', 'Consistent code style across sessions', 'Team memory on Enterprise'],
  },
  {
    id: 'sonnet-4-1m',
    date: '2025-08-19',
    name: 'Sonnet 4: 1M Context',
    category: 'Developer',
    summary: 'Sonnet 4 expands to 1M-token context on the API.',
    howItWorks:
      'Same model, bigger window. Prompts above 200K tokens use a long-context pricing tier to offset the serving cost.',
    competitors: ['Gemini 2.5 (1M)', 'GPT-4.1 (1M)', 'MiniMax-01 (4M)'],
    useCases: ['Whole-codebase reasoning', 'Entire legal corpora', 'Month-long chat histories'],
    pricing: '≤200K: $3/$15 · >200K: $6/$22.50 per 1M tokens.',
  },
  {
    id: 'chrome-pilot',
    date: '2025-08-26',
    name: 'Claude for Chrome (Pilot)',
    category: 'Product',
    tag: 'Research Preview',
    summary: 'Browser-native Claude agent for Max users.',
    howItWorks:
      'A Chrome extension that lets Claude see and act on the tab you\'re viewing — click, fill forms, extract data — gated behind explicit per-site permissions.',
    competitors: ['OpenAI Operator', 'Google Mariner', 'Perplexity Comet', 'Browser Use'],
  },
  {
    id: 'agent-sdk',
    date: '2025-09-16',
    name: 'Claude Agent SDK',
    category: 'Developer',
    summary: 'Build production agents with the same harness Anthropic uses.',
    howItWorks:
      'Open-sources the agent loop that powers Claude Code and internal Anthropic agents: tool orchestration, planning, sandboxed execution, subagent spawning, hooks.',
    competitors: ['OpenAI Agents SDK', 'LangGraph', 'CrewAI', 'LlamaIndex Agents'],
    useCases: ['Custom coding agents', 'Domain-specific research agents', 'Customer-support agents'],
  },
  {
    id: 'claude-sonnet-4-5',
    date: '2025-09-29',
    name: 'Claude Sonnet 4.5',
    category: 'Model',
    tag: 'Flagship',
    summary: '"World\'s best coding model" — 30+ hour autonomous runs.',
    howItWorks:
      'Major leap in long-horizon agent reliability: sharper planning, better recovery from dead-ends, and far less drift over multi-hour runs. Also ships Claude Agent SDK, VS Code extension, and Code Execution tool.',
    competitors: ['GPT-5', 'Gemini 2.5 Deep Think', 'DeepSeek V3.2'],
    impact: '77.2% on SWE-bench Verified; 30+ hour agentic runs in internal tests.',
    pricing: '$3 / $15 per 1M tokens.',
  },
  {
    id: 'imagine',
    date: '2025-09-30',
    name: 'Imagine with Claude',
    category: 'Research',
    tag: 'Research Preview',
    summary: 'Generative UI — Claude builds software in real time as you use it.',
    howItWorks:
      'Instead of generating code to deploy, Claude generates and renders interfaces on-the-fly per interaction. Every click builds the next view.',
    competitors: ['ChatGPT Canvas', 'v0', 'Websim'],
    availability: '5-day research preview for Max users.',
  },
  {
    id: 'claude-haiku-4-5',
    date: '2025-10-15',
    name: 'Claude Haiku 4.5',
    category: 'Model',
    summary: 'Fast, cheap Haiku that matches Sonnet 4 quality.',
    howItWorks:
      'A distilled model that inherits Claude 4 post-training at a fraction of the cost and 2× the speed. Great as a sub-agent model orchestrated by Sonnet/Opus.',
    competitors: ['GPT-5 nano', 'Gemini 2.5 Flash', 'DeepSeek V3'],
    impact: 'Matches Sonnet 4 on most real-world tasks at 1/3 the price.',
    pricing: '$1 / $5 per 1M tokens.',
  },
  {
    id: 'claude-skills',
    date: '2025-10-16',
    name: 'Claude Skills',
    category: 'Developer',
    summary: 'Reusable agent capabilities shipped as folders of instructions + scripts.',
    howItWorks:
      'A Skill is a directory with a SKILL.md and optional code/resources. Claude auto-loads the right Skill for a task. Skills work across Claude.ai, API, and Claude Code.',
    competitors: ['OpenAI GPTs', 'Custom Claude Projects', 'LangChain Tools'],
    useCases: ['Org-specific workflows', 'Brand-voice writing', 'Custom data pipelines'],
  },
  {
    id: 'claude-in-chrome',
    date: '2025-10-16',
    name: 'Claude in Chrome (GA)',
    category: 'Integration',
    tag: 'GA',
    summary: 'Agentic Chrome extension goes generally available.',
    howItWorks:
      'Claude reads the DOM of the current tab, runs actions on your behalf, and shows a task log you can intervene in. Gated per-site permissioning with a "prompt-injection firewall" trained to refuse instructions embedded in page content.',
    competitors: ['OpenAI Operator', 'Perplexity Comet', 'Google Mariner'],
  },
  {
    id: 'claude-code-web',
    date: '2025-10-20',
    name: 'Claude Code on Web & Mobile',
    category: 'Developer',
    summary: 'Run Claude Code from claude.ai and the iOS app.',
    howItWorks:
      'Anthropic-hosted sandboxes execute your coding task in the cloud. Kick off a job from the web or your phone; come back when the PR is ready to review.',
    competitors: ['Devin', 'Cursor Background Agents', 'Replit Agent', 'Copilot Workspace'],
    useCases: ['Fire-and-forget tasks', 'Mobile code reviews', 'Parallel agent fleets'],
  },
  {
    id: 'life-sciences',
    date: '2025-10-22',
    name: 'Claude for Life Sciences',
    category: 'Enterprise',
    summary: 'Pre-built vertical for pharma & biotech with Benchling, Synapse.org.',
    howItWorks:
      'Skills, connectors, and policies tuned for regulated life-sciences workflows: lab notebooks, clinical trial docs, FDA submission drafting.',
    competitors: ['BenchSci', 'Atomwise', 'Causaly'],
    useCases: ['Regulatory writing', 'Target identification', 'Trial protocol drafting'],
  },
  {
    id: 'claude-excel',
    date: '2025-10-27',
    name: 'Claude in Excel',
    category: 'Integration',
    summary: 'Native Claude add-in for Microsoft Excel.',
    howItWorks:
      'Sidebar panel that reads the active sheet, writes formulas in-place, explains cells, and can drive multi-sheet analyses. Works with Excel on web, Windows, and Mac.',
    competitors: ['Microsoft 365 Copilot in Excel', 'Rows AI', 'Equals'],
    useCases: ['Formula generation', 'Data cleaning', 'Financial modeling', 'Audit trails'],
  },
  {
    id: 'claude-opus-4-5',
    date: '2025-11-24',
    name: 'Claude Opus 4.5',
    category: 'Model',
    tag: 'Flagship',
    summary: 'Closes the year with the strongest frontier Opus yet.',
    howItWorks:
      'Headline gains on agentic coding, long-horizon task completion (12+ hour horizon), and tool-use efficiency. Introduces "reasoning effort" API parameter.',
    competitors: ['GPT-5.1', 'Gemini 3', 'DeepSeek V3.2'],
    impact: 'SWE-bench Verified ~80%; new SOTA on multi-agent orchestration benchmarks.',
    pricing: '$15 / $75 per 1M tokens.',
  },

  // ========== 2026 ==========
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
